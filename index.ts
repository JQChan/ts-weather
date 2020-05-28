import commander from 'commander';
import colors from 'colors';
import axios from 'axios';
// import { IWeatherResponse } from './interfaces';

console.log('hello ts-weather');

const command = commander
  .version('0.1.0')
  // commander命令使用
  // .option('-p, --peppers', 'Add peppers')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq-sauce', 'Add bbq sauce')
  // .option('-c --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .option('-c, --key [key]', '请输入高德地图key')
  .option('-c, --city [name]', '请输入城市名称')
  .option('-c, --extensions [extensions]', '请输入气象类型， base：返回实况天气，all：返回预报天气', 'all')
  .parse(process.argv);

const { key, city, extensions } = command;
const { log } = console;
log(key, city, extensions);

if (!city && !key && !extensions) {
  command.outputHelp();
}
if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}

const URL = 'https://restapi.amap.com/v3/weather/weatherInfo';

log(`${URL}?key=${encodeURI(key)}&extensions=${encodeURI(extensions)}&city=${encodeURI(city)}`);

axios.get(`${URL}?key=${encodeURI(key)}&city=${encodeURI(city)}&extensions=${encodeURI(extensions)}`)
  .then((res: AxiosResponse<IWeatherResponse>) => {
    if (extensions === 'all') {
      log(res.data);
      log(res.data.lives);
      const forecast = res.data && res.data.forecasts && res.data.forecasts[0];
      if (forecast) {
        log(colors.yellow(forecast.reporttime));
        log(colors.white(`${forecast.province} ${forecast.city}`));
        forecast.casts.forEach((cast) => {
          log(colors.green(`${cast.dayweather} ${cast.daytemp}℃`));
        });
      }
    } else {
      log(res.data);
      log(res.data.lives);
      const live = res.data && res.data.lives && res.data.lives[0];
      if (live) {
        log(colors.yellow(live.reporttime));
        log(colors.white(`${live.province} ${live.city}`));
        log(colors.green(`${live.weather} ${live.temperature}℃`));
      }
    }
  }).catch(() => {
    log(colors.red('天气服务出现异常'));
  });
