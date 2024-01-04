docker_build(
  'person-crud-backend',
  context='./backend',
  live_update=[
    sync('./backend', '/app'),
  ]
)

docker_build(
  'person-crud-frontend',
  context='./frontend',
  live_update=[
    sync('./frontend', '/app'),
  ]
)

k8s_yaml(
    [
      'infra/dev/backend-secret.yml',
      'infra/dev/frontend-secret.yml', 
      'infra/dev/backend-deployment.yml', 
      'infra/dev/services.yml', 
      'infra/dev/frontend-deployment.yml'
    ]
)


k8s_resource(
  'backend-deployment',
  port_forwards=['3001:3001'],
  labels=["application"]
)

k8s_resource(
  'frontend-deployment',
  port_forwards=['3000:3000'],
  labels=["application"]
)