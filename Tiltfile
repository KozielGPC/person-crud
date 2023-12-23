load('ext://helm_resource', 'helm_resource', 'helm_repo')

docker_build('person-crud-backend',
          context='./backend',
          live_update=[
               sync('./backend', '/app'),
          ]
)

docker_build('person-crud-frontend',
          context='./frontend',
          live_update=[
            sync('./frontend', '/app'),
          ]
)

k8s_yaml(['infra/backend-secret.yml','infra/frontend-secret.yml', 'infra/backend-deployment.yml', 'infra/services.yml', 'infra/frontend-deployment.yml'])

k8s_resource('backend-deployment',
           port_forwards=['3001:3001']
)

k8s_resource('frontend-deployment',
           port_forwards=['3000:3000']
)

# Add the Bitnami Helm repository
# helm_repo('bitnami', 'https://charts.bitnami.com/bitnami')

# Install the Redis, MongoDB, and RabbitMQ Helm charts with "services" label
# helm_resource('mysql', 'bitnami/mysql', resource_deps=['bitnami'])
# helm_resource('redis', 'bitnami/redis', labels=['services'])
# helm_resource(name='mongodb', chart='bitnami/mongodb', version='11.7.5', labels=['services'])
# helm_resource(name='rabbitmq', chart='bitnami/rabbitmq', version='9.3.6', labels=['services'])
