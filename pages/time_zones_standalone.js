class TimeZoneTimer extends React.Component {
	constructor(props) {
		super(props)

		this.state = { time: this.updateTime(true), selected: false }
		this.interval = setInterval(this.updateTime.bind(this), 1000)
		this.clickHandler = this.clickHandler.bind(this)
	}
	updateTime(returnValue) {
		let d = new Date(Date.now() + this.props.offset * 3600000)
		let h = '0' + d.getUTCHours()
		let m = '0' + d.getUTCMinutes()
		let s = '0' + d.getUTCSeconds()
		let t = `${h.slice(-2)}:${m.slice(-2)}:${s.slice(-2)}`
		if (returnValue) return t
		this.setState({ time: t })
	}
	clickHandler(e) {
		this.props.callback(!this.state.selected, this.props)
		this.setState({
			selected: !this.state.selected,
		})
		e.target.blur()
	}
	render() {
		return (
			<div
				style={{
					width: '200px',
					height: '200px',
					padding: '10px',
					margin: '10px',
					borderRadius: '200px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					position: 'relative',
					background: '#ffffff' + (this.state.selected ? '30' : '13'),
				}}
			>
				<div
					style={{
						textAlign: 'center',
						position: 'absolute',
						top: '20px',
						width: '55%',
						fontSize: '18px',
						color: '#ffffff99',
						borderRadius: '80% 80% 0% 0%',
					}}
				>
					{this.props.value}
				</div>
				<div
					style={{
						fontSize: '48px',
						color: '#ffffff',
						marginTop: '10px',
					}}
				>
					{this.state.time}
				</div>
				{!this.props.disabled && (
					<button
						onClick={this.clickHandler}
						style={{
							position: 'absolute',
							bottom: '20px',
							cursor: 'pointer',
							background: '#03dac5',
							color: '#000000',
							border: '0',
							padding: '5px',
							fontSize: '20px',
							outline: '0!important',
						}}
					>
						{this.state.selected ? 'CLEAR' : 'SAVE'}
					</button>
				)}
			</div>
		)
	}
	componentWillUnmount() {
		clearInterval(this.interval)
	}
}

class TimeZonesContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { timezones: [] }
		this.clickHandler = this.clickHandler.bind(this)
		this.selectTimer = this.selectTimer.bind(this)
		this.selectedTimers = []
	}
	selectTimer(status, data) {
		// console.log('timer ', data, 'is now set to ', status)
		if (status) {
			this.selectedTimers.push(data)
		} else {
			this.selectedTimers.splice(this.selectedTimers.indexOf(data), 1)
		}
		console.log(this.selectedTimers)
	}
	clickHandler() {
		console.log('click')
		this.setState({
			timezones: this.selectedTimers.map(el => {
				let x = JSON.parse(JSON.stringify(el))
				x.disabled = true
				return x
			}),
		})
	}
	render() {
		return (
			<div
				style={{
					width: this.props.width,
					height: this.props.heigth,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
					flexWrap: 'wrap',
					background: '#121212',
					paddingTop: '60px',
				}}
			>
				<div
					style={{
						width: '100%',
						textAlign: 'center',
						fontSize: '48px',
						position: 'absolute',
						top: 0,
						color: 'white',
						background: '#ffffff28',
					}}
				>
					Select time zones:
					<button
						onClick={this.clickHandler}
						style={{
							position: 'absolute',
							right: '10px',
							top: '10px',
							border: '0px',
							color: 'black',
							background: '#bb86fc',
							fontSize: '20px',
							padding: '3px',
							cursor: 'pointer',
						}}
					>
						Show selected
					</button>
				</div>
				{this.state.timezones.length > 0
					? this.state.timezones.map(timezone => (
							<TimeZoneTimer
								key={timezone.value}
								{...timezone}
								callback={this.selectTimer}
							/>
					  ))
					: 'error - data file not loaded'}
			</div>
		)
	}
	componentDidMount() {
		fetch(this.props.dataSource)
			.then(res => res.json())
			.then(data => {
				console.log('fetched data:', data)
				this.setState({ timezones: data })
			})
	}
}
TimeZonesContainer.defaultProps = {
	width: '100%',
	height: '100%',
}

ReactDOM.render(
	<div>
		<TimeZonesContainer dataSource="http://localhost:5500/data/zones.json" />
	</div>,
	document.getElementById('root')
)
