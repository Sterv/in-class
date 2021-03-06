import React, { Component } from 'react';

import BarChart from './barChart';
import PieChart from './pieChart';


export default class ClassQuizSummary extends Component {

  constructor(props) {
    super(props);
  };

  renderQuizResults() {

    return this.props.data.analyzedQuizes.map((quizResult) => {

      let datapack = {
        title: quizResult.title, 
        labels: quizResult.uniqueScores, 
        data: quizResult.scoreData 
      };

      return (
        <div key={quizResult.title} >

          <BarChart data={datapack} />

          <p><strong>Class Average: </strong>{quizResult.classAverage}%</p>
          <p><strong>Standard Deviation: </strong>{quizResult.stdDev}%</p>
          <p><strong>Number of Students: </strong>{quizResult.numStudents}</p>

          <PieChart data={datapack} />

        </div>
      );
    });
  };



  render() {

    return (

      <div>
      {this.renderQuizResults()}
      </div> 

    );
  };
}