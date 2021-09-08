import ClockType from './clocktype';
import Configuration from './config';

interface RendererClickEventArgs {
  config: Configuration;
  clockType: ClockType;
  timeString: string;
}

export default RendererClickEventArgs;
