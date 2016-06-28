import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fetchDataActionCreators from '../actions/index';
import {Link , browserHistory} from 'react-router';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';
import LineChart from './line_chart';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';
import Select from 'react-select';
import BelowData from './below_data';
import ShowTable from './show_table';
import ActiveButton from './show_active_button';
import TableData from './table_data';
import {Table} from 'react-bootstrap';

class ShowChart extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor() {
		super();
		this.state = { checked: false , start: moment().subtract(31, 'days'), end: moment().add(-1, 'days'), url:'daily', selectValue: 'Available'};
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleHourlyButton = this.handleHourlyButton.bind(this);
		this.handleDailyButton = this.handleDailyButton.bind(this);
		this.handleWeeklyButton = this.handleWeeklyButton.bind(this);
		this.handleMonthlyButton = this.handleMonthlyButton.bind(this);
		this.renderPosts = this.renderPosts.bind(this);
		this.mySortFunc = this.mySortFunc.bind(this);
		this.handleSelectedAnalytics = this.handleSelectedAnalytics.bind(this);
		this.setStartState = this.setStartState.bind(this);
	}

	componentWillMount(){
		this.setStartState();
	}

	handleCheckBoxChange() {
	    this.setState({
	      checked: !this.state.checked
	    });	    
	}

	handleStartDateChange(startD){
		this.setState({
	      start: startD
	    });
	}

	handleEndDateChange(endD){
		this.setState({
			end: endD
		});
	}

	handleHourlyButton(){
		this.setState({
			checked : false,
			url: "hourly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-hourly.json")
	}

	handleDailyButton(){
		this.setState({
			checked : false,
			url: "daily"
		});
		this.props.fetchChartAction.fetchChartData("A5zHSH7f.json")
	}

	handleWeeklyButton(){
		this.setState({
			checked : false,
			url: "weekly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-weekly.json")
	}

	handleMonthlyButton(){
		this.setState({
			checked : false,
			url: "monthly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-monthly.json")
	}

	handleSelectedAnalytics(val){
		this.setState({
			selectValue: val.target.value,
			url: val.target.value
		});
		this.props.fetchChartAction.fetchChartData("A5zHSH7f.json");
		this.context.router.replace(val.target.value);
	}

	setStartState(){
		this.setState({
			url: this.props.location.pathname
		});
		if (this.props.location.pathname.indexOf('hourly') !== -1){
			console.log("hourly");
			this.props.fetchChartAction.fetchChartData("chatcount-hourly.json");
		} else if (this.props.location.pathname.indexOf('daily') !== -1){
			console.log("daily");
			this.props.fetchChartAction.fetchChartData("A5zHSH7f.json");
		} else if (this.props.location.pathname.indexOf('weekly')!== -1){
			console.log("weekly");
			this.props.fetchChartAction.fetchChartData("chatcount-weekly.json")
		} else if (this.props.location.pathname.indexOf('monthly')!== -1){
			console.log("monthly");
			this.props.fetchChartAction.fetchChartData("chatcount-monthly.json")
		}
	}

	getChatCountList(){
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				return this.props.posts.chatCounts.map((post) => {return post.chatCount});
			}
		}else{
			return <div>Loading...</div>
		}
	}

	getChatGrowthList(){
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				return this.props.posts.chatCounts.map((post) => {return post.chatGrowth});
			}
		}else{
			return <div>Loading...</div>
		}
	}

	getChartLabel(){
		var i = 0;
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				if (this.state.url.indexOf('hourly') !== -1){
					var curDay = '';
					return this.props.posts.chatCounts.map((post) => 
					{
						var day = moment(new Date(post.periodStart));
						if (curDay != day.format('dddd')){
							curDay = day.format('dddd');
							return day.format("LLL");
						}else{
							return '';
						}
					});
				}else if (this.state.url.indexOf('daily') !== -1){
					return this.props.posts.chatCounts.map((post) => 
					{
						var day = moment(new Date(post.periodStart));
						return day.format("LL");
					});
				}else if (this.state.url.indexOf('weekly') !== -1){
					return this.props.posts.chatCounts.map((post) => 
						{
							var day = moment(new Date(post.periodStart));
							if (day.format("dddd").indexOf('Monday') !== -1){
								return day.format("LL");
							}else{
								return '';
							}
						}
					);
				}else if (this.state.url.indexOf('monthly') !== -1){
					return this.props.posts.chatCounts.map((post) => 
						{
							var day = moment(new Date(post.periodStart));
							if (day.format("LL").indexOf('January') !== -1){
								var monthYear = ''+ day.format("MMMM") + day.format("YYYY");
								return monthYear;
							}else{
								return day.format("MMMM");
							}		
						}
					);
				}
			}
		}else{
			return <div>Loading...</div>
		}
	}

	mySortFunc(a,b,order){
		if (this.state.url.indexOf("weekly") !== -1){
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"MM/YYYY") - moment(b.date,"MM/YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"MM/YYYY") - moment(a.date,"MM/YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}else if (this.state.url.indexOf("monthly") !== -1){
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"YYYY") - moment(b.date,"YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"YYYY") - moment(a.date,"YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}else{
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"DD/MM/YYYY") - moment(b.date,"DD/MM/YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"DD/MM/YYYY") - moment(a.date,"DD/MM/YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}
	}

	renderPosts() {
		var CCTable =[];
		var i = 1;
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <div>Loading...</div>;
			}else{
				this.props.posts.chatCounts.map((post) => {
					if (this.state.url.indexOf('hourly') !== -1){
						var tempPost = {
							no: i,
							date: moment(new Date(post.periodStart)).format("DD/MM/YYYY"), 
							day: moment(new Date(post.periodStart)).format("LT"), 
							inCC: post.incomingChatCount, outCC: post.outgoingChatCount, 
							CC: post.chatCount, 
							CG: post.chatGrowth};	
						i++;
					}else if (this.state.url.indexOf('daily') !== -1){
						var tempPost = {
							no: i,
							date: moment(new Date(post.periodStart)).format("DD/MM/YYYY"), 
							day: moment(new Date(post.periodStart)).format("dddd"), 
							inCC: post.incomingChatCount, outCC: post.outgoingChatCount, 
							CC: post.chatCount, 
							CG: post.chatGrowth};	
						i++;
					}else if (this.state.url.indexOf('weekly') !== -1){
						var tempPost = {
							no: i,
							date: moment(new Date(post.periodStart)).format("MM/YYYY"), 
							day: _.round((moment(new Date(post.periodStart)).format("D")/7)+1), 
							inCC: post.incomingChatCount, outCC: post.outgoingChatCount, 
							CC: post.chatCount, 
							CG: post.chatGrowth};
						i++;	
					}else if (this.state.url.indexOf('monthly') !== -1){
						var tempPost = {
							no: i,
							date: moment(new Date(post.periodStart)).format("YYYY"), 
							day: moment(new Date(post.periodStart)).format("MMMM"), 
							inCC: post.incomingChatCount, outCC: post.outgoingChatCount, 
							CC: post.chatCount, 
							CG: post.chatGrowth};
						i++;
					}
					CCTable.push(tempPost);					
				});
				if (this.state.url.indexOf('hourly') !== -1){
					return (
						<ShowTable data={CCTable} dayHeader={"Hour"} mySortFunc = {this.mySortFunc}/>
					);
				}else if (this.state.url.indexOf('daily') !== -1){
					return (
						<ShowTable data={CCTable} dayHeader={"Day"} mySortFunc = {this.mySortFunc}/>
					);
				}else if (this.state.url.indexOf('weekly') !== -1){
					return (
						<ShowTable data={CCTable} dayHeader={"Week"} mySortFunc = {this.mySortFunc}/>
					);
				}else if (this.state.url.indexOf('monthly') !== -1){
					return (
						<ShowTable data={CCTable} dayHeader={"Month"} mySortFunc = {this.mySortFunc}/>
					);
				}
			}
		}else{
			return <div>Loading...</div>
		}
	}

	render() {
		const chatCountList=this.getChatCountList();
		const chatGrowthList=this.getChatGrowthList();
		const chatLabel = this.getChartLabel();
		const content = this.state.checked 
    		? <div>
	      		<LineChart data = {chatCountList} data2={chatGrowthList} label = {chatLabel}/>
	      		<BelowData data = {this.props.posts}/>
	      	</div>	
			:<div>
		      	{this.renderPosts()}	
				<BelowData data = {this.props.posts}/>
			</div>;
		const startDate = moment(new Date(+this.state.start));
		const endDate = moment(new Date(+this.state.end));
		return (
			<div>
				<h3>Chat Count</h3>
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-2">
						  	<select
							    name="Analytics Type"
							    onChange={this.handleSelectedAnalytics}>
							     <option value="daily" className="select-hr">CHAT COUNT</option>
							     <option value="conversation" className="select-hr">CONVERSATION</option>
							     <option value="C" className="select-hr">C</option>
						    </select>
						</div>
						<div className="col-md-1">
							<label className = 'label'>
								<input 
						  			type="checkbox" 
						  			checked={ this.state.checked } 
						  			onChange={ this.handleCheckBoxChange } />  Show Chart
					  		</label>
					  	</div>
					  	<div className="col-md-2">
					  		<p className="periode">
					  			<label className = 'label'>Periode</label>
					  		</p>
				  		</div>
				  			<div className="col-md-2">
					  		<DateTimeField defaultText= {startDate.format("L") +' '+ startDate.format("LT")}
					  			inputFormat="MM/DD/YYYY h:mm A"
					  			onChange = {this.handleStartDateChange} />
					  			</div>
				  			<div className="col-xs-1">
					  			<p className="until">-</p>
				  			</div>
					  	<div className="col-md-2">
				  			<DateTimeField defaultText={endDate.format("L") +' ' + endDate.format("LT")} 
				  				inputFormat="MM/DD/YYYY h:mm A"
				  				minDate = {startDate.add(1,'days')}
				  				maxDate = {moment().subtract(1,'days')}
				  				onChange = {this.handleEndDateChange}/>
				  		</div>
				  		<ActiveButton url={this.state.url} handler = {this} />				  		
				  	</div>
				</div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { posts: state.posts.all }
}

const mapDispatchToProps = (dispatch) => {
	return{
		fetchChartAction: bindActionCreators(fetchDataActionCreators,dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowChart); 