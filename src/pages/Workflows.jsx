import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import WorkflowCard from '../components/WorkflowCard'
import SectionReveal from '../components/SectionReveal'

const workflows = [
  {
    name: 'build-eks.yaml',
    description: 'Orchestrates the full EKS deploy pipeline: docker build/push, Helm package/push, and GitOps deployment.',
    calls: ['pre-build', 'docker-build-push', 'helm-package-push', 'service-deployment-gitops'],
    example: true,
  },
  {
    name: 'build-eks-pr-test.yaml',
    description: 'PR smoke gate — runs your build against a throwaway branch before merge. No secrets required for the build step.',
    calls: ['pre-build', 'docker-build-test'],
    example: true,
  },
  {
    name: 'pre-build.yaml',
    description: 'Parses cicd.yaml, computes next semver from git history, and outputs image and chart version strings as step outputs.',
    calls: ['compute-next-semver'],
    example: true,
  },
  {
    name: 'docker-build-push.yaml',
    description: 'Build and push container images to ECR. Handles multi-arch builds via buildx. Authenticates via AWS OIDC or access keys.',
    example: true,
  },
  {
    name: 'docker-build-test.yaml',
    description: 'Credential-free PR gate — builds the Dockerfile without pushing. Validates the image builds cleanly against every PR.',
    example: true,
  },
  {
    name: 'helm-package-push.yaml',
    description: 'Package and publish Helm charts to ECR OCI registry. Versions the chart using the semver computed in pre-build.',
    example: true,
  },
  {
    name: 'service-deployment-gitops.yaml',
    description: "Updates Chart.yaml in a GitOps repo to the newly published chart version, triggering Argo CD or Flux to deploy.",
    example: true,
  },
  {
    name: 'gcp-cloudrun-deploy.yaml',
    description: 'Deploy to GCP Cloud Run. Authenticates via Workload Identity Federation. Reads image config from cicd.yaml.',
    example: true,
  },
  {
    name: 'compute-next-semver.yaml',
    description: 'Automatic semantic version calculation from conventional commits. Returns major, minor, patch, and full version strings.',
    example: true,
  },
  {
    name: 'success-check.yaml',
    description: 'Aggregate job conclusions for branch protection rules. Set this as the required status check; it passes when all dependent jobs pass.',
    example: true,
  },
]

export default function Workflows() {
  const [active, setActive] = useState(workflows[0].name)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section className="pt-20 pb-10 px-5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto pt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Workflow Library
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Every workflow your team needs.
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Prebuilt, maintained, and pinned to immutable commit SHAs for supply-chain safety.
              Reference any workflow with a single <code className="font-mono text-xs" style={{ color: 'var(--accent)' }}>uses:</code> line.
            </p>
            <a
              href="https://github.com/ActionsCI/reusable-workflows"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              View source on GitHub ↗
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sidebar + content layout */}
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 flex-shrink-0 md:sticky md:top-20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Workflows
          </p>
          <nav className="flex flex-col gap-0.5">
            {workflows.map(wf => (
              <a
                key={wf.name}
                href={`#${wf.name}`}
                onClick={() => setActive(wf.name)}
                className="text-xs font-mono px-2.5 py-1.5 rounded transition-all duration-150"
                style={{
                  color: active === wf.name ? 'var(--accent)' : 'var(--text-muted)',
                  background: active === wf.name ? 'var(--surface)' : 'transparent',
                }}
              >
                {wf.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Cards */}
        <div className="flex-1 space-y-5">
          {workflows.map((wf, i) => (
            <div key={wf.name} id={wf.name}>
              <WorkflowCard {...wf} delay={i * 0.05} />
            </div>
          ))}

          <SectionReveal className="pt-4">
            <a
              href="https://github.com/ActionsCI/reusable-workflows"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              View source on GitHub ↗
              <ExternalLink size={13} />
            </a>
          </SectionReveal>
        </div>
      </div>
    </div>
  )
}
