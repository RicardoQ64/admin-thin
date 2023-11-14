import type { App } from "vue";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  GaugeChart,
  GraphChart
} from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  RadarComponent,
  TimelineComponent
} from "echarts/components";

const { use } = echarts;

use([
  GraphChart,
  GaugeChart,
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  RadarComponent,
  TimelineComponent
]);

/**
 * @description 按需引入echarts
 * @see 温馨提示：必须将 `$echarts` 添加到全局 `globalProperties`
 */
export function useEcharts(app: App) {
  app.config.globalProperties.$echarts = echarts;
}

export default echarts;
