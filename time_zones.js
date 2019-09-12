class TimeZoneTimer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { time: 0 }
	}
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
				}}
			>
				<div
					style={{
						textAlign: 'center',
						position: 'absolute',
						top: '10px',
						width: '45%',
						fontSize: '18px',
						color: 'red',
					}}
				>
					{this.props.value}
				</div>
				<div
					style={{
						fontSize: '48px',
						color: 'blue',
						marginTop: '40px',
					}}
				>
					00:00:00
				</div>
				<button
					style={{
						position: 'absolute',
						bottom: '20px',
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
		fetch('http://localhost:3000/zones.json')
			.then(res => res.json())
			.then(data => {
				console.log(data)
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
