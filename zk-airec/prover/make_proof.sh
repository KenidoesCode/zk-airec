#!/usr/bin/env bash
set -e
INPUT=${1:-sample_inputs/sample_user1.json}
node proof_generator.js $INPUT
