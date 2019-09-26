class DBAuth < BaseStorage

  def self.set_user_password(user_id, password)
    db[:dbauth].filter(:user_id => user_id).delete
    db[:dbauth].insert(:user_id => user_id,
                       :pwhash => BCrypt::Password.create(password))
  end

  def self.authenticate(email, password)
    hash = db[:user]
             .join(:dbauth, Sequel[:dbauth][:user_id] => Sequel[:user][:id])
             .filter(Sequel[:user][:email] => email)
             .filter(Sequel[:user][:inactive] => 0)
             .get(Sequel[:dbauth][:pwhash])

    if hash
       BCrypt::Password.new(hash) == password
    else
      false
    end
  end

  def self.authenticate_for_id(user_id, password)
    hash = db[:user]
             .join(:dbauth, Sequel[:dbauth][:user_id] => Sequel[:user][:id])
             .filter(Sequel[:user][:id] => user_id)
             .get(Sequel[:dbauth][:pwhash])

    if hash
      BCrypt::Password.new(hash) == password
    else
      false
    end
  end
end
