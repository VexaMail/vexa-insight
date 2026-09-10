# Kubernetes deployment

Plain-YAML manifests for running Vexa on a single Kubernetes cluster.
For a parameterized install, prefer the Helm chart under
[../helm/vexa-insight](../helm/vexa-insight).

## Prerequisites

- Kubernetes 1.27+
- An ingress controller (manifests target `ingressClassName: nginx`)
- A default `StorageClass` that supports `ReadWriteOnce`
- Optional: cert-manager for TLS (uncomment the annotation in
  `ingress.yaml`)

## Quick start

```sh
# 1. Edit configmap.yaml — set NEXT_PUBLIC_APP_URL and VEXA_ALLOWED_ORIGINS.
# 2. Edit secret.yaml — set SECRET_KEY (and OIDC_* if using SSO).
# 3. Edit ingress.yaml — set the host.
# 4. Pin deployment.yaml's image to a real release tag, not :latest.

kubectl apply -k deploy/k8s

# Verify
kubectl -n vexa get pods,svc,ingress,pvc
kubectl -n vexa logs deploy/vexa
```

## Notes

- **Single-replica only.** Vexa uses SQLite at `/app/data/vexa.db`,
  which is single-writer. The deployment uses `strategy: Recreate` so
  rolling updates do not open two writers at once.
- **Persistent data.** The PVC at `vexa-data` holds the SQLite file AND
  the GeoLite2 city database. Back it up regularly (e.g. via a
  scheduled `kubectl exec` running `sqlite3 .backup`).
- **Boot-time env validation.** `src/lib/env.ts` parses the merged env at
  startup; an invalid `SECRET_KEY` or malformed URL makes the pod fail
  its readiness probe with a clear log line instead of crash-looping
  silently.
- **First-run install token.** On first boot the container logs the
  one-time install token to stdout. Capture it with
  `kubectl -n vexa logs deploy/vexa | grep "install token"`.
- **Update checks.** Set `VEXA_UPDATE_CHECK_ENABLED=false` in the
  ConfigMap to disable outbound calls to GitHub.

## Helm

If you want to template these manifests (multiple environments, value
overrides, integration with an existing Helm-managed cluster), use the
chart at [../helm/vexa-insight](../helm/vexa-insight).
