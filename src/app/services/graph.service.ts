import { Injectable } from "@angular/core";
import { Item } from "../models/app.model";
import * as d3 from 'd3';
import { TitlePosition } from "../models/graph.model";

@Injectable()
export class GraphService {

    static createBarDiagramm(
        dataArray: Item[],
        titlePosition: TitlePosition,
        canvasWidth: number,
        canvasHeight: number) {
        const barWidth = (canvasHeight - 50) / dataArray.length - 10;

        const widthScale = d3
            .scaleLinear()
            .domain([0, this.maxObject(dataArray).value])
            .range([0, canvasWidth]);

        const colorScale = d3.scaleLinear(
            [0, dataArray.length],
            ['crimson', 'yellow']
        );

        const setTitlePosition: Function | number = (titlePosition) => {
            switch (titlePosition) {
                case 'inside':
                    return 10;
                case 'outside':
                    return (d) => widthScale(d.value) + 10;
            }
        }

        const diagramm = d3
            .select('body')
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .append('g') //add group
            .attr('transform', 'translate(50, 0)'); //add common attr for group

        var bars = diagramm
            .selectAll('rect')
            .data(dataArray)
            .enter()
            .append('rect')
            .attr('width', (d) => widthScale(d.value)) //using scale
            .attr('height', barWidth)
            .attr('fill', (d, i) => colorScale(i))
            .attr('y', (d, index) => {
                return index * (barWidth + 10);
            });

        diagramm.selectAll("text")
            .data(dataArray)
            .enter()
            .append('text')
            .text(d => d.title)
            .attr('fill', "black")
            .attr('y', (d, i) => i * (barWidth + 10) + barWidth / 2)
            .attr('x', setTitlePosition(titlePosition))

        const axis = d3.axisBottom(widthScale);
        diagramm
            .append('g')
            .attr('transform', `translate(0, ${canvasHeight - 50})`)
            .call(axis);
    }

    private static maxObject(array: { title: string; value: number }[]): { title: string; value: number } {
        let maxObject = array[0];
        array.forEach((item) => {
            if (item.value > maxObject.value) {
                maxObject = item;
            }
        });
        return maxObject;
    }
}