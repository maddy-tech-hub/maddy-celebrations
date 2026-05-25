import { execSync } from "node:child_process";

try {
  execSync("npm run build:app", { stdio: "inherit", shell: true });
} catch {
  process.exit(1);
}
