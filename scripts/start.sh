#!/bin/bash

if [ "$QSA_PUBLIC_ENV" = "" ]; then
    QSA_PUBLIC_ENV=production
fi

# open files
ulimit -n 65000

set -eou pipefail

cd "`dirname "$0"`/../"

listen_address="0.0.0.0"
listen_port=3333
solr_port=9384
logging=0

if [ "QSA_PUBLIC_ENV" = "" ]; then
    QSA_PUBLIC_ENV=production
fi

while [ "$#" -gt 0 ]; do
    param="$1"; shift
    value="${1:-}"

    case "$param" in
        --listen-address)
            listen_address="$value"
            ;;
        --listen-port)
            listen_port="$value"
            ;;
        --solr-port)
            solr_port="$value"
            ;;
        --logging)
            logging="$value"
            ;;
        --help|-h)
            echo "Usage: $0 [--listen-address $listen_address] [--listen-port $listen_port] [--solr-port $solr_port] [--logging 0/1]"
            exit 0
            ;;
        *)
            echo "Unknown parameter: $param"
            exit 1
            ;;
    esac

    if [ "$value" = "" ]; then
        echo "Value for $param can't be empty"
        exit 1
    fi

    shift
done

function stop_solr() {
    solr_dist/bin/solr stop -p $solr_port
    kill 0
}

function fail() {
    echo "ERROR: $*"
    exit 1
}

lsof -i ":${listen_port}" -sTCP:LISTEN && fail "Port $listen_port already in use"
lsof -i ":${solr_port}" -sTCP:LISTEN && fail "Port $solr_port already in use"

trap "stop_solr" INT TERM EXIT

function run() {
    mkdir -p data/solr
    solr_dist/bin/solr start -f -p $solr_port -s solr -a "-Dsolr.data.home=$PWD/data/solr -Djava.security.egd=file:/dev/./urandom" &
    scripts/jruby.sh distlibs/gems/bin/fishwife app/config.ru --quiet --host $listen_address --port $listen_port -E "$QSA_PUBLIC_ENV" -O request_body_max=134217728
}

if [ "$logging" = "0" ]; then
    run
else
    mkdir -p "$PWD/logs"
    run 2>&1 | scripts/log-rotater.pl "$PWD/logs/%a.log" "$PWD/logs/public.log"
fi
