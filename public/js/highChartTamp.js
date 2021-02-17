const chart1 = Highcharts.chart('vaccination-rates-graph-1',
{
    chart:
    {
        // backgroundColor: null,
        // type:'areaspline'
        backgroundColor: 'transparent'
    },
    xAxis: 
    {
        title:
        {
            text:''
        },
        
        categories: ['04.01','05.01','06.01','07.01','08.01','09.01','10.01','11.01','12.01','13.01','14.01',
                        '15.01','16.01','17.01','18.01','19.01','20.01','21.01','22.01','23.01','24.01','25.01',
                        '26.01','27.01','28.01','29.01','30.01','31.01'],
        tickInterval: 3,
        
    },
    yAxis:
    {
        title: 
        {
            align: 'high',
            offset: 0,
            text: 'אחוז מתחסנים',
            rotation: 0,
            y: -30,
            x:10,
        },
        // title: 'hide',
        tickInterval: 20,
        labels: 
        {
            format: `${value}%`
        }
    },

    title:
    {
        text:'.',  
    },
    
    series:
    [{
        name:'מתחסנים מנה שנייה',
        data:[15,15.4,16,18,19.2,20,21,22,23.4,23.6,24,24.3,25,26.3,27,28,29,31,33,35,38,39,40,41,43,44.3,45,46],
        showInLegend: false,
        
    },
    
    {
        name:'מתחסנים מנה שנייה',
        data:[0,0,0,0,0,0,0.07,0.27,0.65,1.26,1.99,2.5,3,3.4,3.9,4.5,5.6,6.3,7.2,8,9,10.5,12.1,13,14.5,17,17.4,18],
        showInLegend: false
    }],
    credits:
    {
        text:''
    },
    colors:['rgb(28, 125, 126)','rgb(182, 202, 81)']
})

const chart2 = Highcharts.chart('vaccination-rates-graph-2',
{
    chart:
    {
        // backgroundColor: null,
        type:'areaspline',
        backgroundColor: 'transparent'
    },
    xAxis: 
    {
        // labels: {
        //     style: {
        //         color: '#BADA55'
        //     }
        // },
        title:
        {
            text:''
        },
        categories: ['04.01','05.01','06.01','07.01','08.01','09.01','10.01','11.01','12.01','13.01','14.01',
                        '15.01','16.01','17.01','18.01','19.01','20.01','21.01','22.01','23.01','24.01','25.01',
                        '26.01','27.01','28.01','29.01','30.01','31.01'],
        tickInterval: 3,
    },
    yAxis:
    {

        title: 
        {
            align: 'high',
            offset: 0,
            text: 'מספר מתחסנים',
            rotation: 0,
            y: -30,
            x:10
        },
        // title: 'hide',
        tickInterval: 800000,
        labels: 
        {
            format: '{value}'
        }
    },

    title:
    {
        text:'.',  
    },
    
    series:
    [{

        name:'מתחסנים מנה שנייה',
        data:[1500000,1600000,1700000,1800000,1900000,2000000,2100000,2200000,2300000,2400000,2500000,2600000,2700000,2800000,2900000,3000000,3100000,3200000,3300000,3400000,3500000,3700000,3800000,3900000,4000000,4100000,4200000,4300000],
        showInLegend: false,
        fillColor: 
        {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: 
            [
                [0, 'rgb(28, 125, 126)'],
                [1, 'transparent']
            ]
        }
    },
    
    {
        name:'מתחסנים מנה שנייה',
        data:[0,0,0,0,0,0,6000,50000,120000,250000,500000,600000,800000,950000,1050000,1100000,1250000,1375000,1400000,1500000,1600000,1700000,1800000,1900000,2000000,2100000,2200000,2300000],
        showInLegend: false,
        fillColor: 
        {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: 
            [
                [0, 'rgb(182, 202, 81)'],
                [1, 'transparent']
            ]
        }
    }],
    credits:
    {
        text:''
    },
    colors:['rgb(28, 125, 126)','rgb(182, 202, 81)']
})


// document.addEventListener('DOMContentLoaded',()=>
// {
const chart3 = Highcharts.chart('vaccination-rates-graph-3',
{
    chart:
    {   
        backgroundColor: 'transparent',
        type:'column'
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    legend: {
        reversed: true
    },
    xAxis: 
    {
        title:
        {
            text:''
        },
        categories: ['04.01','05.01','06.01','07.01','08.01','09.01','10.01','11.01','12.01','13.01','14.01',
                        '15.01','16.01','17.01','18.01','19.01','20.01','21.01','22.01','23.01','24.01','25.01',
                        '26.01','27.01','28.01','29.01','30.01','31.01'],
        tickInterval: 3,
        
    },
    yAxis:
    {

        title: 
        {
            align: 'high',
            offset: 0,
            text: 'מספר מתחסנים',
            rotation: 0,
            y: -30,
            x:10
        },
        // title: 'hide',
        tickInterval: 50000,
        labels: 
        {
            format: '{value}'
        }
    },

    title:
    {
        text:'.',  
    },
    
    series:
    [{
        name:'מתחסנים מנה שנייה',
        data:[150000,160000,170000,180000,190000,200000,210000,220000,230000,240000,250000,260000,270000,280000,290000,300000,310000,320000,330000,340000,350000,370000,380000,390000,400000,410000,420000,430000],
        showInLegend: false,
        
    },
    
    {
        name:'מתחסנים מנה שנייה',
        data:[0,0,0,0,0,0,6000,5000,12000,25000,50000,60000,80000,95000,105000,110000,125000,137500,140000,150000,160000,170000,180000,190000,200000,210000,220000,230000],
        showInLegend: false
    }],
    credits:
    {
        text:''
    },
    colors:['rgb(28, 125, 126)','rgb(182, 202, 81)']
})