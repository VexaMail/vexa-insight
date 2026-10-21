#!/usr/bin/env python3
import argparse
from pathlib import Path
from purge_public_cache import purge_public_cache
from read_public_deploy_config import read_public_deploy_config


def main():
    parser = argparse.ArgumentParser(description='Purge the public checker cache using an external deployment configuration.')
    parser.add_argument('--config', type=Path, default=Path.home() / '.config/vexa-insight/public-deploy.json')
    args = parser.parse_args()
    purge_public_cache(read_public_deploy_config(args.config))


if __name__ == '__main__':
    main()
