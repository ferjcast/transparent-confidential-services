## GLOBAL VARIABLES ##

variable "project_id" {
  description = "The GCP project to deploy into"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west4"
}

variable "zone" {
  description = "GCP zone"
  type        = string
  default     = "europe-west4-a"
}

variable "network" {
  description = "Name of the VPC network to attach to"
  type        = string
  default     = "default"
}

variable "golden_image_project_id" {
  description = "Project ID where the golden boot disk image is stored"
  type        = string
}


