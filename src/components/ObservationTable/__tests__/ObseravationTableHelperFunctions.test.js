import {
    generateObservableEntity,
    generateObservableEntityStatusInterpretation,
    generateObservableEntityValue,
    generateRowsForMembers,
    getConceptText,
    getConceptTextForComponents
} from "../ObservationTableHelperFunctions";

describe('ObservationTableHelperFunctions', () => {
    const observations = [
        {
            hasMember:true,
            resource:{
                id:'463eba1b-e80a-4e0a-8ce4-8f803c343763',
                hasMember:[
                    {
                        reference: "Observation/463eba1b-e80a-4e0a-8ce4-8f803c343763",
                        display: "Respiratory Rate"
                    }
                ]
            }
        }
    ];
    const observation = {
        status: 'active',
        component:[
            {
                valueString:'value',
                code:{
                    text:'text'
                },
                interpretation: [
                    {
                        text: 'normal',
                    },
                ],
            }
        ]
    };

    it('should return text from object', () => {
        expect(getConceptText(observation.component[0].code)).toEqual('text');
        expect(getConceptText({coding:[{display:'text'}]})).toEqual('text');
        expect(getConceptText({})).toEqual(undefined);
    });

    it('should return list with text and value for components', () => {
        expect(getConceptTextForComponents(observation.component)).toMatchSnapshot();
        expect(getConceptTextForComponents(undefined)).toEqual(undefined);
    });

    it('should return entity from observation', () => {
        expect(generateObservableEntity(observation.component[0])).toEqual('text');
    });

    it('should return entity value from observation', () => {
        expect(generateObservableEntityValue(observation)).toMatchSnapshot();
    });

    it('should return entity status from observation', () => {
        expect(generateObservableEntityStatusInterpretation(observation)).toMatchSnapshot();
    });

    it('should generate rows for members from observation', () => {
        expect(generateRowsForMembers(observations)).toMatchSnapshot();
    });
});
