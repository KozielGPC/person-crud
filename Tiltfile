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
      'infra/backend-secret.yml',
      'infra/frontend-secret.yml', 
      'infra/backend-deployment.yml', 
      'infra/services.yml', 
      'infra/frontend-deployment.yml'
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