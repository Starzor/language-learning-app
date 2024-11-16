import { TestData } from "./TestData";

export interface TestEvaluationRequest {
    answers: Array<string>;
    test: TestData;
}