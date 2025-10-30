# GitHub Actions Setup

## RPC Client Generation Workflow

This workflow automatically generates the RPC client and pushes it to the frontend repository whenever code is pushed to the `main` branch.

### Required Setup

#### 1. Create a Personal Access Token (PAT)

You need to create a GitHub Personal Access Token with repository access:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "RPC Client Deployment"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again)

#### 2. Add the Token as a Repository Secret

1. Go to your backend repository (`sigma-arri`)
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `FE_REPO_TOKEN`
5. Value: Paste the Personal Access Token you created
6. Click "Add secret"

### How It Works

1. **Trigger**: Runs on every push to the `main` branch
2. **Generate**: Runs `bun run build` to generate `rpc_client.gen.ts`
3. **Deploy**: 
   - Clones the `fanboykun/sigma-fe` repository
   - Copies the generated client to `src/lib/rpc/rpc_client.gen.ts`
   - Commits and pushes the changes

### Customization

If you need to change the destination path in the frontend repository, modify line 41 in `ci.yml`:

```yaml
cp backend/rpc_client.gen.ts frontend/src/lib/rpc/rpc_client.gen.ts
```

Change `frontend/src/lib/rpc/rpc_client.gen.ts` to your desired path.

### Notes

- The commit message includes `[skip ci]` to prevent infinite loops if the frontend repo also has CI workflows
- The workflow uses `git diff --staged --quiet` to only commit if there are actual changes
