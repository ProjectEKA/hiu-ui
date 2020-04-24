export class BundleContext {
  constructor(bundle) {
    this.bundle = bundle;
  }

  findReference(resourceType, reference) {
    const entry = this.bundle.entry.find((e) => {
      if (!resourceType) {
        return reference.includes(e.resource.id);
      }
      if (e.resource.resourceType.toLowerCase() === resourceType.toLowerCase()) {
        // TODO very simplistic includes. we would need regex
        return reference.includes(e.resource.id);
      }
      return false;
    });
    return entry ? entry.resource : undefined;
  }
}
