const BagOfWords = (props: any) => {
const { bagOfWords } = props

  return (
  <div className="bagOfWords">
      {bagOfWords && console.log(bagOfWords)}
      {bagOfWords && (
          <table>
              <tbody>
                  {bagOfWords.map((pair: any, index: number) => {
                      const key = Object.keys(pair)[0];
                      const value = pair[key];
                      return (
                          <tr key={index}>
                              <td className="firstWord">{key}</td>
                              <td>{value}</td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
      )}
  </div>
  );
};

export default BagOfWords;
