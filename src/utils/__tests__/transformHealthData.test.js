import transformHealthData from "../transformHealthData";
import healthData from "./HealthData";
import getNestedObject from "../getNestedObject";

describe("transform Health Data", () => {
  it("will return objects with respective resource type if it doesnt exist", () => {
    const expectedObject = {
      Observation: {
        headings: {},
        data: {}
      }
    };
    expect(transformHealthData(healthData)).toMatchObject(expectedObject);
  });
  it("will return objects with respective resource type if it doesnt exist", () => {
    expect(transformHealthData(healthData).hasOwnProperty("Observation")).toBe(
      true
    );
    expect(
      transformHealthData(healthData).hasOwnProperty("DiagnosticReport")
    ).toBe(true);
  });
  it("will return objects with respective resource type if it doesnt exist", () => {
    expect(
      transformHealthData(healthData).Observation.headings.hasOwnProperty(
        "date"
      )
    ).toBe(true);
    expect(
      getNestedObject(
        transformHealthData(healthData),
        "Observation.headings.date"
      )
    ).toBe("Date");
  });
});
