//  /effects/list

const axios = require('axios');

class Aurora
{
	constructor(opts)
	{
		opts = opts || {};
		opts.port = opts.port || process.env.AURORA_PORT || 16021;
		opts.host = opts.host || process.env.AURORA_HOST;
		opts.token = opts.token || process.env.AURORA_TOKEN;
		this.apibase = `http://${opts.host}:${opts.port}/api/beta`;

		this.req = axios.create({
			baseURL: `http://${opts.host}:${opts.port}/api/beta/${opts.token}`
		});
	}

	multistate(opts)
	{
		return this.req.put('/state', opts).then(rez => rez.data);
	}

	state(field)
	{
		return this.req.get(`/state/${field}`).then(rez =>
		{
			return rez.data.value;
		});
	}

	setState(field, value)
	{
		const opts = {};
		opts[field] = value;
		return this.multistate(opts);
	}

	newToken()
	{
		return axios.post(`${this.apibase}/new`).then(rez =>
		{
			return rez.data.auth_token;
		});
	}

	info()
	{
		return this.req.get('/').then(rez => rez.data);
	}

	identify()
	{
		return this.req.put('/identify').then(rez => rez.data);
	}

	animation(name)
	{
		const body = { write: {
			command : 'request',
			animName: name,
			version : '1.0',
		}};

		return this.req.put('/effects', body).then(rez => rez.data);
	}

	animations()
	{
		const body = { write: {
			command : 'requestAll',
			version : '1.0',
		}};

		return this.req.put('/effects', body).then(rez => rez.data.animations);
	}

	addAnimation(effect)
	{
		const write = Object.assign({
			command: 'add',
			version: '1.0',
		}, effect);

		return this.req.put('/effects', { write }).then(rez => rez.data);
	}

	effects()
	{
		return this.req.get('/effects/list').then(rez => rez.data);
	}

	effect()
	{
		return this.req.get('/effects/select').then(rez => rez.data);
	}

	setEffect(name)
	{
		return this.req.put('/effects', { select: name }).then(rez => rez.data);
	}

	layout()
	{
		return this.req.get('/panelLayout/layout').then(rez =>
		{
			const ints = rez.data.layoutData.split(' ').map(i => Number(i));
			const result = {
				count: ints.shift(),
				sideLength: ints.shift(),
				panels: [],
			};

			while(ints.length)
			{
				const p = {
					id: ints.shift(),
					x: ints.shift(),
					y: ints.shift(),
					orientation: ints.shift()
				};
				result.panels.push(p);
			}

			return result;
		});
	}

	orientation()
	{
		return this.req.get('/panelLayout/globalOrientation').then(rez => rez.data.value);
	}

	on()
	{
		return this.setState('on', true);
	}

	off()
	{
		return this.setState('on', false);
	}

	mode()
	{
		return this.state('colorMode');
	}

	brightness()
	{
		return this.state('brightness');
	}

	setBrightness(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 100) v = 100;
		return this.setState('brightness', v);
	}

	saturation()
	{
		return this.state('sat');
	}

	setSaturation(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 100) v = 100;

		return this.setState('sat', Number(v));
	}

	hue()
	{
		return this.state('hue');
	}

	setHue(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 360) v = 360;

		return this.setState('hue', Number(v));
	}

	temperature()
	{
		return this.state('ct');
	}

	setTemperature(v)
	{
		v = Number(v);
		if (v < 1200) v = 1200;
		if (v > 6500) v = 6500;

		return this.setState('ct', Number(v));
	}

	display(panels)
	{
		const write = {
			command: 'display',
			version: '1.0',
			animType: 'static',
			loop: false,
			animData: panels.join(' ')
		};
		return this.req.put('/effects', { write }).then(rez => rez.data);
	}
}

Aurora.ANIM_TYPES = new Set(['highlight', 'wheel', 'flow', 'explode', 'fade']);
Aurora.DIRECTIONS = new Set(['outwards', 'up', 'down', 'left', 'right']);

module.exports = Aurora;
