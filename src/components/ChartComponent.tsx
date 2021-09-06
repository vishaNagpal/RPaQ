import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { IPieData, ISimilarityItem } from '../helper/interfaces';
import { categoryList } from '../helper/Constants';

interface IProps {
    pieDataList: IPieData[]
    similarityObject?: Record<string, ISimilarityItem | null> | null
}

const ChartComponent: React.FunctionComponent<IProps> = function ({ similarityObject, pieDataList }: IProps) {
    const [selected, setSelected] = useState<string | null>(null);
    let selectedObject = similarityObject && selected ? similarityObject[selected] : null;

    useEffect(() => {
        setSelected(null)
    }, [similarityObject])

    return (<article className='chartWrapper'>
        <h2>Similarity With Categories</h2>
        <PieChart
            animate
            animationDuration={500}
            animationEasing="ease-out"
            paddingAngle={0}
            startAngle={0}
            data={pieDataList}
            label={({ dataEntry }) => dataEntry.percentage ? `${dataEntry.title} (${Math.round(dataEntry.percentage)})%` : ''}
            labelPosition={50}
            labelStyle={{
                fontSize: "4px",
                fontWeight: 400,
                color: "FFFFFA",
                textTransform: 'capitalize',
            }}
            onClick={(ev, index) => {
                setSelected(categoryList[index])
            }}
        />
        <div id='chart-selected-list'>
            {selectedObject ? <>
                <h2>Selected Category: {selected && selected.toUpperCase()}</h2>
                {
                    selectedObject.similarityList.map(item => <span key={`item-${item}`}>{item.charAt(0).toUpperCase() + item.substr(1, item.length)}</span>)
                }

            </> : null}

        </div>
    </article>)
}

export default ChartComponent;