pipeline {
    agent {
        docker {
            image 'docker/compose:1.28.5'
            args "-v /var/run/docker.sock:/var/run/docker.sock --entrypoint='' --ipc='host'"
        }
    }

    environment {
        IS_CI = 1

        // Docker compose
        DC_BACKEND_CMD = "test"
        DC_FRONTEND_CMD = "test:ci"
        DC_FILE_ROOT= "."
        DC_ENV_FILE = ".env"
        CYPRESS_RECORD_KEY = credentials('CYPRESS_RECORD_KEY')
    }
        
    stages {
        stage('Peparing build and test environment') {
            steps {
                createDockerComposeCIfile()
                dcDown()
            }
        }
        stage('Building images') {
            steps {
                dcBuild()
            }
        }
        stage('Run tests backend') {
            steps {
                dcRun('asp-backend', '$DC_BACKEND_CMD')
                dcDown()
            }
        }
        stage('Run tests asp-frontend') {
            steps {
                dcRun('asp-frontend', '$DC_FRONTEND_CMD')
                dcDown()
            }
        }
    }
    post {
        always {
            dcDown()
        }
    }
}

def createDockerComposeCIfile() {
    sh 'cp -f ${DC_FILE_ROOT}/docker-compose.yml ${DC_FILE_ROOT}/docker-compose.ci.yml'
    sh "sed '/#REMOVE_IN_CI/d' -i ${DC_FILE_ROOT}/docker-compose.ci.yml" // Remove 
    sh "sed 's/#ADD_IN_CI //g' -i ${DC_FILE_ROOT}/docker-compose.ci.yml" // Creating CI docker compose file
}

def dcBuild() {
    sh "docker-compose \
        --project-name ${BUILD_TAG}\
        -f ${DC_FILE_ROOT}/docker-compose.ci.yml \
        --env-file ${DC_ENV_FILE} \
        build"
}

def dcRun(String DC_SERVICE, String DC_CMD) {
    sh "docker-compose \
        --project-name ${BUILD_TAG}\
        -f ${DC_FILE_ROOT}/docker-compose.ci.yml \
        --env-file ${DC_ENV_FILE} \
        run -e CYPRESS_BUILD_ID=${BUILD_TAG} \
        --rm ${DC_SERVICE} ${DC_CMD}"
}

def dcDown() {
    sh "docker-compose \
        --project-name ${BUILD_TAG}\
        -f ${DC_FILE_ROOT}/docker-compose.ci.yml \
        down -v" // Downing all running compose containers
}