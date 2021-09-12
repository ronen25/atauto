import ClockType from './Clocktype';
import Configuration from './Config';

interface RendererClickEventArgs {
  config: Configuration;
  clockType: ClockType;
  timeString: string;
}

export default RendererClickEventArgs;
