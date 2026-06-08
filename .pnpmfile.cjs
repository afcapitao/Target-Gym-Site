function readPackageJsonHook(pkg) {
  if (pkg.name === 'esbuild') {
    pkg.scripts ??= {}
    delete pkg.scripts.postinstall
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackageJson: readPackageJsonHook,
  },
}
