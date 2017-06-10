# nanoleaves

A command-line tool for interacting with your Nanoleaf Aurora. Also includes a full API client for the Aurora!

## CLI usage

Provide the IP address of your Aurora in the environment variable `AURORA_HOST` and your API access token in `AURORA_TOKEN`. If your AURORA is listening on an unusual port, use `AURORA_PORT`.

To generate a token, hold the power key until the light starts flashing, then run `nanoleaves token`.

```
$ nanoleaves --help
Commands:
  animation <name>          get details about the given animation effect
  brightness [number]       get or set the overall brightness
  effect [name]             get or set the current effect
  effects                   list available effects
  hsb <hue> <sat> <bright>  set the hue, sat, and brightness for all panels
  info                      get all available info about your Aurora
  layout                    show the panel layout
  off                       turn your Aurora off
  on                        turn your Aurora on
  panels                    show the panel ids
  saturation [number]       get or set the overall saturation
  temp [number]             get or set the overall color temperature
  token                     generate a new API access token
  upload <filename>         upload a json file containing a new animation effect

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## API usage

```js
const AuroraAPI = require('nanoleaves');
const aurora = new AuroraAPI({
    host: '10.0.0.2',
    token: 'your-api-token'
});

aurora.info().then(info =>
{
	  console.log(info);
});
```

All API functions return promises.

* `newToken()` - generate a new API token
* `info()` - return all info about the Aurora
* `identify()` - flash panels
* `animation(name)` - get detailed information about a specific animation effect
* `brightness()` - get the brightness for all panels
* `setBrightness(v)` - set the brightness for all panels; 0-100
* `effect()` - get the name of the current effect
* `effects()` - return a list of the names of all effects
* `setEffect(name)` - set the active effect by name
* `hue()` - get the hue for all panels
* `setHue(v)` - set the hue for all panels; 0-360
* `layout()` - get panel layout data
* `mode()` - get the Aurora's current color mode
* `off()` - turn the Aurora off
* `on()` - turn the Aurora on
* `orientation()` - get the global orientation; 0-360
* `saturation()`  - get the saturation for all panels
* `setSaturation(v)` - set the saturation for all panels; 0-100
* `temperature()` - get the color temperature for all panels
* `setTemperature(v)` - set the color temperature for all panels; 1200-6500
* `addAnimation(json)` - store a new animation effect on the Aurora

## License

ISC
