interface TestQuestion {
  question: string;
  type: string;
  level: string;
  explanation_cz: string;
}

interface Evaluation {
  [key: string]: string;
}

export interface TestData {
  test: Array<TestQuestion>;
  evaluation: Evaluation;
}
