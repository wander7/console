export enum StartedByLabel {
  triggers = 'triggers.tekton.dev/eventlistener',
}
export enum StartedByAnnotation {
  user = 'pipeline.openshift.io/started-by',
}

export enum PipelineResourceType {
  git = 'git',
  image = 'image',
  cluster = 'cluster',
  storage = 'storage',
}

export const pipelineResourceTypeSelections = {
  '': 'Select resource type',
  [PipelineResourceType.git]: 'Git',
  [PipelineResourceType.image]: 'Image',
  [PipelineResourceType.cluster]: 'Cluster',
  [PipelineResourceType.storage]: 'Storage',
};

export enum VolumeTypes {
  EmptyDirectory = 'Empty Directory',
  ConfigMap = 'Config Map',
  Secret = 'Secret',
  PVC = 'PVC',
}

export enum SecretAnnotationId {
  Git = 'git',
  Image = 'docker',
}

export const SecretAnnotationType = {
  [SecretAnnotationId.Git]: 'Git Server',
  [SecretAnnotationId.Image]: 'Docker Registry',
};

export const PIPELINE_SERVICE_ACCOUNT = 'pipeline';

// Annotation for referencing pipeline name in case of PipelineRun with no reference to a Pipeline (embedded pipeline)
export const preferredNameAnnotation = 'pipeline.openshift.io/preferredName';

export enum TektonResourceLabel {
  pipeline = 'tekton.dev/pipeline',
  pipelinerun = 'tekton.dev/pipelineRun',
  taskrun = 'tekton.dev/taskRun',
  pipelineTask = 'tekton.dev/pipelineTask',
}