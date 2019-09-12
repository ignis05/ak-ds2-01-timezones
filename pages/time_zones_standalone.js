class TimeZoneTimer extends React.Component {
	constructor(props) {
		super(props)

		this.state = { time: this.updateTime(true) }
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
	clickHandler() {}
	render() {
		return (
			<div
				style={{
					width: '200px',
					height: '200px',
					border: '2px solid black',
					padding: '10px',
					margin: '10px',
					borderRadius: '200px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					position: 'relative',
					background: '#ffffff13',
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
						borderRadius:'80% 80% 0% 0%'
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
					}}
				>
					SAVE
				</button>
			</div>
		)
	}
}

class TimeZonesContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { timezones: [] }
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
				}}
			>
				{this.state.timezones.length > 0
					? this.state.timezones.map((timezone, i) => (
							<TimeZoneTimer key={i} {...timezone} />
					  ))
					: 'error - data file not loaded'}
			</div>
		)
	}
	componentDidMount() {
		fetch('http://localhost:5500/data/zones.json')
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
		<div style={{ width: '100%', textAlign: 'center', fontSize: '48px' }}>
			Select time zones:
		</div>
		<TimeZonesContainer />
	</div>,
	document.getElementById('root')
)