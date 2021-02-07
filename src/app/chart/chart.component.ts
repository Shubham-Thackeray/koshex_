import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as util from 'zrender/lib/core/util';
import { EChartsOption } from 'echarts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const SymbolSize = 200;

// export interface curentPointer{x:any,y:any,offsetX:any,offsetY:any,isActive:boolean};
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnDestroy {
  constructor(
    // public modalservice: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  formAddLE: FormGroup = this.formBuilder.group({
    amount: [12.6, [Validators.required]],
    year: [2030, [Validators.required]],
    type: '',
    title: '',
    priority: '',
    age: '',
  });

  Current = { x: 0, y: 0, offsetX: 0, offsetY: 0, isActive: false };
  draging: boolean = false;
  isDropped: boolean = false;
  mouseOver: boolean = false;
  currentAge = 28;
  Data = [
    [28, 10],
    [32, 25],
    [36, 26],
    [40, 42],
    [44, 45],
    [48, 35],
    [52, 58],
    [56, 82],
    [60, 90],
    [70, 75],
    [80, 60],
    [90, 30],
  ];
  @ViewChild('customContent', { static: true }) customContent: ElementRef;
  chart: any;
  showChart = true;
  lifeEvents = [
    {
      title: 'buy a new house',
      type: 'House',
      image: '../../assets/house2.png',
      amount: 1200000,
    },
    {
      title: 'buy a new Gadget',
      type: 'Gadget',
      image: '../../assets/gadget.png',
      amount: 1300000,
    },
    {
      title: 'Make family',
      type: 'Family',
      image: '../../assets/family.png',
      amount: 1400000,
    },
    {
      title: 'invest to educate',
      type: 'Education',
      image: '../../assets/education.png',
      amount: 1500000,
    },
    {
      title: 'get a vehicle',
      type: 'Vehicle',
      image: '../../assets/vehicle.png',
      amount: 1600000,
    },
  ];
  labelData = [
    {
      type: 'Vehicle',
      title: 'buy a new vehicle',
      priority: '',
      amount: 1200000,
      year: 2030,
      age: 32,
    },
    {
      type: 'House',
      title: 'buy a new house',
      priority: '',
      amount: 900000,
      year: 2030,
      age: 32,
    },
    {
      type: 'House',
      title: 'buy a new house',
      priority: '',
      amount: 1200000,
      year: 2030,
      age: 60,
    },
  ];

  updatePosition: () => void;

  options = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      type: 'value',
      axisLine: { onZero: true, show: false, onZeroAxisIndex: 0 },
      axisLabel: {
        formatter: function (value) {
          return value >= 100 ? value / 100 + 'Cr' : value + 'L';
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty',
      },

      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty',
      },
    ],
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: true,
        data: this.Data,
        // symbol: function (data, params) {
        //   return
        // },

        symbolPosition: 'end',
        label: {
          normal: {
            show: true,
            offset: [0, 32],
            textStyle: {
              color: '#000',
              fontSize: 9,
            },
            formatter: (params) => {
              return this.setlabel(params) || '{b | }';
            },

            rich: {
              //  TO DO --add riches  --waiting for assets
              House: {
                backgroundColor: {
                  image: '../assets/house.png',
                },
                height: 32,
                width: 32,
              },
              Gadget: {
                backgroundColor: {
                  image: '../assets/gadget.png',
                },
                height: 32,
                width: 32,
              },
              house: {
                backgroundColor: {
                  image: '../assets/house.png',
                },
                height: 32,
                width: 32,
              },
              Family: {
                backgroundColor: {
                  image: '../assets/family.png',
                },
                height: 32,
                width: 32,
              },
              Education: {
                backgroundColor: {
                  image: '../assets/education.png',
                },
                height: 32,
                width: 32,
              },
              Vehicle: {
                backgroundColor: {
                  image: '../assets/vehicle.png',
                },
                height: 32,
                width: 32,
              },
              b: {
                backgroundColor: {
                  image: '',
                },
                height: 32,
                width: 32,
              },
            },
          },
        },
      },
    ],
  };

  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.updatePosition) {
      window.removeEventListener("resize", this.updatePosition);
    }
  }
  onChartReady(myChart: any) {
    this.chart = myChart;
    const onPointDragging = function (dataIndex) {
      this.Data[dataIndex] = myChart.convertFromPixel(
        { gridIndex: 0 },
        this.position
      ) as number[];

      // Update data
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: this.Data,
          },
        ],
      });
    };

    const showTooltip = (dataIndex) => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex,
      });
    };

    const hideTooltip = () => {
      myChart.dispatchAction({
        type: 'hideTip',
      });
    };

    const updatePosition = () => {
      myChart.setOption({
        graphic: util.map(this.Data, (item) => ({
          position: myChart.convertToPixel({ gridIndex: 0 }, item),
        })),
      });
    };

    window.addEventListener('resize', updatePosition);
    myChart.on('dataZoom', updatePosition);

    // save handler and remove it on destroy
    this.updatePosition = updatePosition;

    setTimeout(() => {
      myChart.setOption({
        graphic: util.map(this.Data, (item, dataIndex) => {
          return {
            type: 'circle',
            position: myChart.convertToPixel({ gridIndex: 0 }, item),
            shape: {
              cx: 0,
              cy: 0,
              r: SymbolSize / 2,
            },
            invisible: true,
            draggable: false,
            ondrag: util.curry<(dataIndex: any) => void, number>(
              onPointDragging,
              dataIndex
            ),
            onmousemove: util.curry<(dataIndex: any) => void, number>(
              showTooltip,
              dataIndex
            ),
            onmouseout: util.curry<(dataIndex: any) => void, number>(
              hideTooltip,
              dataIndex
            ),
            z: 100,
          };
        }),
      });
    }, 10);
  }

  setlabel(params) {
    return this.labelData
      .filter((x) => {
        return x.age == params.name;
      })
      .map((y) => {
        return '{' + y.type + '|' + ' ' + '}' + '\n';
      });
  }

  drag(e) {
    this.draging = true;
    this.isDropped = false;
  }

  drop(event: CdkDragDrop<string[]>) {
 
    if (this.Current.x) {
      this.isDropped = true;
      this.draging = false;
      this.formAddLE.controls.amount.setValue(
        this.lifeEvents[event.previousIndex].amount / 100000
      );
      this.formAddLE.controls.type.setValue(
        this.lifeEvents[event.previousIndex].type
      );
      this.formAddLE.controls.title.setValue(
        this.lifeEvents[event.previousIndex].title
      );

      const year = this.Current.x - this.currentAge + 2021;
      this.formAddLE.controls.year.setValue(year);
    }
  }

  allowDrop(e) {
    e.preventDefault();
  }

  addLE() {
    this.showChart = false;
    const data = this.formAddLE.value;
    const age = data.year - 2021 + this.currentAge;
    this.labelData.push({
      type: data.type,
      title: data.title,
      priority: data.priority,
      amount: data.amount * 100000,
      year: data.year,
      age: age,
    });

    const chartdata = JSON.parse(JSON.stringify(this.Data));
    if (this.Data.findIndex((x) => x[0] === age) == -1) {
      let index = this.Data.findIndex((x) => x[0] > age);
      this.Data.splice(index, 0, [age, this.getRndInteger(12, 80)]);
    }
    setTimeout(() => {
      this.showChart = true;
    }, 10);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  eventT(e, name) {
    console.log(e, '===>e' + name);
  }

  onMouseIn(e) {
    this.currentSet(
      e?.data[0],
      e?.data[1],
      e?.event?.offsetX,
      e?.event?.offsetY,
      true
    );
  }

  onMouseOut(e) {
    // dont remove settimeout --workaround for event delay
    setTimeout(() => {
      if (!this.mouseOver) {
        this.currentSet(0, 0, 0, 0, false);
      }
    }, 100);
  }

  currentSet(x, y, ox, oy, active) {
    return (this.Current = {
      x: x,
      y: y,
      offsetX: ox,
      offsetY: oy,
      isActive: active,
    });
  }

  closeModal() {
    this.isDropped = false;
  }

  mapTooltip(param) {
    return this.labelData.filter((x) => {
      return x.age == param;
    });
  }

  delete(data) {
    const index = this.labelData.findIndex(
      (x) => x.age == data.age && x.title == data.title
    );
    if (index > -1) {
      this.showChart = false;
      this.mouseOver = false;
      this.currentSet(0, 0, 0, 0, false);
      this.labelData.splice(index, 1);
    }
    setTimeout(() => {
      // this.currentSet(0,0,0,0,false);
      this.showChart = true;
    }, 10);
  }
}
