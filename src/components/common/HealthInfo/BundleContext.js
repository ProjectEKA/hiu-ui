export class BundleContext {
  constructor(bundle) {
    this.bundle = bundle;
  }

  findReference(targetResourceType, ref) {
    const resourceType = targetResourceType || this.getResourceType(targetResourceType, ref);
    if (!resourceType) return undefined;
    if (!ref.reference) return undefined;
    const entry = this.bundle.entry.find((e) => {
      if (e.resource.resourceType.toLowerCase() === resourceType.toLowerCase()) {
        const resourceId = this.getEntryResourceId(e);
        if (resourceId) {
          return ref.reference.includes(resourceId);
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
      console.warn(`Resource.id is null. Falling back on default implementation of fullUrl format urn:uuid:uuid. Bundle entry fullUrl=${  entry.fullUrl}`);
      // TODO very simplistic regex, looking for the last colon till the end. will work for urn:uuid:id or similar. 
      const matches = entry.fullUrl.match(/[^:]+$/);
      if (matches) {
        return matches[0];
      }
    }
    return undefined;
  }

  getResourceType(targetResourceType, reference) {
    if (targetResourceType) return targetResourceType;
    if (reference.type) return reference.type;
    const ref = reference.reference;
    if (ref.startsWith("#")) {
       console.error(`Unexpected resource reference to contained resources. Can not resolve:${  ref}`);
       return undefined;
    }
    return ref.substring(0, ref.indexOf("/"));
  }
}
