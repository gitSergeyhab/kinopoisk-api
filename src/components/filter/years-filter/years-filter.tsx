// import React from 'react';
// import Nouislider from 'nouislider-react';
// import 'nouislider/distribute/nouislider.css';

// export default class YearsFilter extends React.Component {
//   state = {
//     textValue: null,
//     percent: null,
//   };

//   onSlide = (render: any, handle: any, value: any, un: any, percent: any) => {
//     this.setState({
//       textValue: value[0].toFixed(0),
//       // percent: percent[0].toFixed(2),
//     });
//   };

//   render() {
//     const { textValue } = this.state;
//     return (
//       <div>
//         <Nouislider
//           connect
//           start={[2010, 2022]}
//           behaviour="tap"
//           range={{
//             min: [1900],
//             // '10%': [500, 500],
//             // '50%': [4000, 1000],
//             max: [2023],
//           }}
//           onSlide={this.onSlide}
//         />
//         {textValue  && (
//           <div>
//             Value: {textValue} %
//           </div>
//         )}
//       </div>
//     );
//   }
// }


// import React from 'react';
// import Nouislider from 'nouislider-react';
// import 'nouislider/distribute/nouislider.css';

// export default class YearsFilter extends React.Component {
//   state = {
//     startYear: null,
//     endYear: null,
//   };

//   onSlide = (render: any, handle: any, value: number[], un: any, percent: any) => {
//     this.setState({
//       startYear: value[0].toFixed(0),
//       endYear: value[1].toFixed(0),
//     });
//   };

//   render() {
//     const { startYear, endYear } = this.state;
//     return (
//       <div>
//         <Nouislider
//           connect
//           start={[2010, 2022]}
//           behaviour="tap"
//           range={{
//             min: [1900],
//             max: [2023],
//           }}
//           onSlide={this.onSlide}
//         />
//         {startYear && endYear  && (
//           <div>
//             с {startYear} года
//             по {endYear} год
//           </div>
//         )}
//       </div>
//     );
//   }
// }


import { useState } from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEndYear, getStartYear } from '../../../store/filter-reducer/filter-reducer-selectors';
import { setEndYear, setStartYear } from '../../../store/action';
import { getStartRangeYears } from '../../../utils/date-utils';
import { Field, FilterRange } from '../../../const';
import { useSearchParams } from 'react-router-dom';
import { getParamsFromSearch } from '../../../utils/url-utils';


export default function YearsFilter () {

  const [searchParams] = useSearchParams();

  const {start, end} = getParamsFromSearch(searchParams, Field.Year, FilterRange.Year.Start, FilterRange.Year.End);

  const dispatch = useDispatch();

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);


  const onSlide = (render: any, handle: any, value: number[], un: any, percent: any) => {
    dispatch(setStartYear( Math.round(value[0]) ));
    dispatch(setEndYear( Math.round(value[1])) );
  };


  return (
    <div>
      <Nouislider
        connect
        start={[start, end]}
        behaviour="tap"
        range={{
          min: [FilterRange.Year.Start],
          '50%': [FilterRange.Year.Middle],
          max: [FilterRange.Year.End],
        }}
        onSlide={onSlide}
      />
      {startYear && endYear  && (
        <div>
            с {startYear} года
            по {endYear} год
        </div>
      )}
    </div>
  );
}
