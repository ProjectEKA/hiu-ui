import getNestedObject from "./getNestedObject";
import { toIndiaDate } from "../constants";

function transformHealthData(data) {
  const finalObject = {};

  data.entries.forEach(element => {
    const currentHipId = element.hipId;

    const entries = element.data.entry.forEach(item => {
      const date = getNestedObject(item, "resource.effectiveDateTime")
        ? toIndiaDate(item.resource.effectiveDateTime)
        : "";
      const observation = getNestedObject(item, "resource.code.text")
        ? item.resource.code.text
        : "-";
      const value = getNestedObject(item, "resource.valueString")
        ? item.resource.valueString
        : "-";

      //status://
      const status = getNestedObject(item, "resource.status")
        ? item.resource.status
        : "-";

      //interpretation://
      const interpretationArray = [];
      const interpretation = getNestedObject(item, "resource.interpretation")
        ? item.resource.interpretation.forEach(intn => {
            interpretationArray.push(intn.text);
          })
        : "";

      //resource type: //
      const performerArray = [];
      const resource_type = item.resource.resourceType;
      const performer = getNestedObject(item, "resource.performer")
        ? item.resource.performer.forEach(performer => {
            if (item.resource.resourceType === "Observation") {
              performerArray.push(performer.display);
            }
            if (item.resource.resourceType === "DiagnosticReport") {
              performer.display
                ? performerArray.push(performer.display)
                : performerArray.push(performer.reference);
            }
          })
        : "-";

      //components: (observation): //
      const componentsArray = [];
      const components = getNestedObject(item, "resource.component")
        ? item.resource.component.forEach(component => {
            componentsArray.push({
              observation: component.code.text ? component.code.text : "",
              value: component.valueString ? component.valueString : "",
              interpretationText: component.interpretation[0].text
                ? component.interpretation[0].text
                : ""
            });
          })
        : "";

      //attachments:
      const attachmentArray = [];
      const attachments = getNestedObject(item, "resource.presentedForm")
        ? item.resource.presentedForm.forEach(attachment => {
            attachmentArray.push({
              url: attachment.url ? attachment.url : "",
              title: attachment.title ? attachment.title : "Link"
            });
          })
        : "";

      if (!finalObject.hasOwnProperty(item.resource.resourceType)) {
        finalObject[item.resource.resourceType] = {
          resource_type: resource_type,
          headings: {
            date: "Date",
            observation: "Observation",
            value: "Value",
            status_and_interpretation: "Status and Interpretation"
          },
          data: [
            {
              hipId: currentHipId,
              date: date,
              observation: observation,
              value: value,
              status_and_interpretation: {
                status: status,
                interpretation: interpretationArray,
                delimiter: "\n"
              },
              components: componentsArray,
              performer: performerArray,
              attachments: attachmentArray
            }
          ]
        };
      } else {
        finalObject[item.resource.resourceType].data.push({
          hipId: currentHipId,
          date: date,
          observation: observation,
          value: value,
          status_and_interpretation: {
            status: status,
            interpretation: interpretationArray,
            delimiter: "\n"
          },
          components: componentsArray,
          performer: performerArray,
          attachments: attachmentArray
        });
      }
    });
  });
  console.log(finalObject);
  return finalObject;
}
export default transformHealthData;
