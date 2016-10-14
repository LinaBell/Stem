#!/bin/sh
aws s3 sync . s3://thematic-dev-web --exclude "node_modules/*" --exclude ".git/*"
aws cloudfront create-invalidation --distribution-id E1Y90EO5BPEGK1 --paths "/*"