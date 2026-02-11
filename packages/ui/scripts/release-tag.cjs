const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const type = process.argv[2] || 'patch';

if (!type) {
  console.error("❌ Please provide version type: patch | minor | major | x.y.z");
  process.exit(1);
}

try {
  console.log(`🚀 Releasing version: ${type}`);

  // 1️⃣ 升级版本（不自动打 tag）
  execSync(`pnpm version ${type} --no-git-tag-version`, {
    stdio: "inherit",
  });

  // 2️⃣ 读取新版本
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const newVersion = pkg.version;

  const tagName = `ui-v${newVersion}`;

  console.log(`📦 New version: ${newVersion}`);
  console.log(`🏷 Tag: ${tagName}`);

  // 3️⃣ 提交
  execSync(`git add .`, { stdio: "inherit" });
  execSync(`git commit -m "release: ui ${newVersion}"`, {
    stdio: "inherit",
  });

  // 4️⃣ 打 tag
  execSync(`git tag ${tagName}`, { stdio: "inherit" });

  // 5️⃣ 推送
  execSync(`git push`, { stdio: "inherit" });
  execSync(`git push origin ${tagName}`, { stdio: "inherit" });

  console.log("✅ Release complete!");
} catch (error) {
  console.error("❌ Release failed.");
  process.exit(1);
}
