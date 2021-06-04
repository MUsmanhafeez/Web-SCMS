# Config
ENV_FILE=${ENV_FILE:-.env}

# Loading config
export $(grep -v '^#' $ENV_FILE | xargs -d '\n')

DC_FILE_ROOT=${_DC_FILE_ROOT:-${DC_FILE_ROOT:-.}}
DC_SERVICE_NAME=${_DC_SERVICE_NAME:-${DC_SERVICE_NAME:-web}}
DC_CMD=${_DC_CMD:-${DC_CMD:-test}}
COMPOSE_PROJECT_NAME=${_COMPOSE_PROJECT_NAME:-${COMPOSE_PROJECT_NAME:-web}}

if [ -z "${bamboo_buildKey}" ]; then 
    project_name=$COMPOSE_PROJECT_NAME
else 
    project_name="amoxt-os-ci-$bamboo_buildKey"
fi

cmd_base="docker-compose --project-name $project_name"
cmd_env="$cmd_base  --env-file $ENV_FILE"
cmd_file="$cmd_env -f $DC_FILE_ROOT/docker-compose.yml"
cmd_run="$cmd_file run --rm $DC_SERVICE_NAME"
cmd="$cmd_run $DC_CMD"

if [ ! -z "${DC_BUILD}" ]; then 
    docker-compose build $DC_SERVICE_NAME
fi
$cmd
exit_code=$?

echo "Removing containers"
docker container rm -f $(docker container ls  -a --format "{{.Names}}" | grep $project_name)

exit $exit_code
