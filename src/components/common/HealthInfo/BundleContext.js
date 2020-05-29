export class BundleContext {
  constructor(bundle) {
    this.bundle = bundle;
  }

  findReference(resourceType, reference) {
    const entry = this.bundle.entry.find((e) => {
      if (e.resource.resourceType.toLowerCase() === resourceType.toLowerCase()) {
        const resourceId = this.getEntryResourceId(e);
        if (resourceId) {
          return reference.includes(resourceId);
        }
      }
      return false;
    });
    return entry ? entry.resource : undefined;
  }

  getEntryResourceId(entry) {
    if (entry.resource.id) {
      return entry.resource.id;
    }

    if (entry.fullUrl) {
      console.warn("Falling back on default implementation of looking into fullUrl. Resource id is undefined. This should have never happenned. Bundle entry fullUrl=" + entry.fullUrl);
      // TODO very simplistic regex, looking for the last colon till the end. will work for urn:uuid:id or similar. 
      const matches = entry.fullUrl.match(/[^:]+$/);
      if (matches) {
        return matches[0];
      }
    }
    return undefined;
  }
}
