require 'json'

class Search

  SOLR_CHARS = '+-&|!(){}[]^"~*?:\\/ '

  def self.solr_url(path = false)
    unless @solr_url
      @solr_url = AppConfig[:solr_url]

      unless @solr_url.end_with?('/')
        @solr_url += '/'
      end
    end

    path ? URI.join(@solr_url, path) : @solr_url
  end


  def self.solr_escape(s)
    pattern = Regexp.quote(SOLR_CHARS)
    s.gsub(/([#{pattern}])/, '\\\\\1')
  end


  def self.build_keyword_query(s)
    s.split(' ').map {|subq| solr_escape(subq)}.join(' ')
  end


  class SolrSearchFailure < StandardError; end


  def self.solr_handle_search(query_params)
    solr_url = AppConfig[:solr_url]

    unless solr_url.end_with?('/')
      solr_url += '/'
    end

    query_params = {'qt' => 'json'}.merge(query_params)
    query_params = {'rows' => AppConfig[:page_size]}.merge(query_params)

    search_uri = URI.join(solr_url, 'select')
    search_uri.query = URI.encode_www_form(query_params)

    request = Net::HTTP::Get.new(search_uri)

    Net::HTTP.start(search_uri.host, search_uri.port) do |http|
      response = http.request(request)

      raise SolrSearchFailure.new(response) unless response.code.start_with?('2')

      return JSON.parse(response.body)
    end
  end


  def self.date_pad_start(s)
    default = ['0000', '01', '01']
    bits = s.split('-')

    full_date = (0...3).map {|i| bits.fetch(i, default.fetch(i))}.join('-')

    "#{full_date}T00:00:00Z"
  end


  def self.date_pad_end(s)
    default = ['9999', '12', '31']
    bits = s.split('-')

    full_date = (0...3).map {|i| bits.fetch(i, default.fetch(i))}.join('-')

    "#{full_date}T23:59:59Z"
  end


  # Either of these parameters might be nil or empty
  def self.build_date_filter(start_date, end_date)
    # A record is NOT in range if its start date is after our end date, OR its
    # end date is before our start date.

    clauses = []

    unless end_date.to_s.empty?
      clauses << "start_date:[#{date_pad_end(end_date)} TO *]"
    end

    unless start_date.to_s.empty?
      clauses << "end_date:[* TO #{date_pad_start(start_date)}]"
    end

    if clauses.empty?
      '*:*'
    else
      "NOT (#{clauses.join(' OR ')})"
    end
  end


  def self.build_supplied_filters(filters)
    return '*:*' if filters.empty?

    clauses = []

    filters.each do |field, value|
      clauses << '%s:%s' % [solr_escape(field), solr_escape(value)]
    end

    clauses.join(' AND ')
  end


  VALID_SORTS = {
    'relevance' => 'score desc',
    'title_asc' => 'title_sort asc',
    'title_desc' => 'title_sort desc',
    'qsaid_asc' => 'qsaid_sort asc',
    'qsaid_desc' => 'qsaid_sort desc',
  }


  def self.parse_sort(sort_spec)
    VALID_SORTS.fetch(sort_spec)
  end


  def self.resolve_agency_names(facets)
    agency_uris = facets.fetch('creating_agency', []).each_slice(2).map(&:first)
    result = {}

    return result if agency_uris.empty?

    # We're assuming that our facet limit is lower than the maximum number of
    # boolean clauses here, which it should be.  If that changes, we'd need to
    # fire more than one search.
    response = solr_handle_search('q' => '*:*',
                                  'fq' => 'uri:(%s)' % agency_uris.map {|uri| solr_escape(uri)}.join(" OR "),
                                  'fl' => 'uri,title',
                                  'rows' => agency_uris.length,)

    response.fetch('response', {}).fetch('docs', []).each do |doc|
      result[doc.fetch('uri')] = doc.fetch('title')
    end

    result
  end


  def self.for_type(record_type, page, sort_by)
    start_index = (page * AppConfig[:page_size])
    response = solr_handle_search(q:"primary_type:#{record_type}",
                       start: start_index,
                       sort: parse_sort(sort_by)).fetch('response', {})

    {
      'total_count' => response.fetch('numFound'),
      'current_page' => page,
      'page_size' => AppConfig[:page_size],
      'sorted_by' => sort_by,
      'results' => response.fetch('docs', [])
    }
  end


  def self.get_record_by_qsa_id(qsa_id_prefixed)
    solr_handle_search(q: "qsa_id_prefixed:#{solr_escape(qsa_id_prefixed.upcase)}")
      .fetch('response')
      .fetch('docs')
      .map do |doc|
      return JSON.parse(doc.fetch('json'))
    end

    nil
  end

end
