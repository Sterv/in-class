import React, { Component } from 'react';

import BarChart from './BarChart';
import PieChart from './PieChart';


export default class SingleQuizSummary extends Component {

  constructor(props) {
    super(props);
  };

  renderQuizResults() {

    let idx = this.props.data.selectedQuiz;

    let quizResult = this.props.data.analyzedQuizes[idx];

    console.log(this.props)

    let datapack = {
      title: quizResult.title, 
      labels: quizResult.uniqueScores, 
      data: quizResult.scoreData 
    };

    return (
      <div key={quizResult.title}>

        <BarChart data={datapack} />

        <p><strong>Class Average: </strong>{quizResult.classAverage}%</p>
        <p><strong>Standard Deviation: </strong>{quizResult.stdDev}%</p>
        <p><strong>Number of Students: </strong>{quizResult.numStudents}</p>

        <PieChart data={datapack} />

      </div>
    );
  };



  render() {

    return (

      <div>
      {this.renderQuizResults()}
      </div> 

    );
  };
}