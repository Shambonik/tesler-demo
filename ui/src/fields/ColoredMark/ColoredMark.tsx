import React from 'react'
import { Popover } from 'antd'
import { useSelector } from 'react-redux'
import { AppState } from '../../interfaces/storeSlices'
import { ColoredMarkField } from '../../interfaces/widget'
import { DataItem } from '@tesler-ui/core/interfaces/data'
import styles from './ColoredMark.module.css'

export interface ColoredMarkProps {
    value: string
    cursor: string
    widgetName: string
    meta: ColoredMarkField
}

function ColoredMark({ value, cursor, widgetName, meta }: ColoredMarkProps) {
    const bcName = useSelector((state: AppState) => state.view.widgets?.find(i => i.name === widgetName)?.bcName)
    const data = useSelector((state: AppState) => bcName && state.data[bcName]?.find(item => item.id === cursor)) as DataItem

    if (!value) {
        return null
    }

    const displayedDescription = meta?.hintKey ? data?.[meta.hintKey] : null

    if (!displayedDescription) {
        return null
    }

    return (
        <Popover trigger="hover" content={<p className={styles.markInfo}>{displayedDescription}</p>}>
            <span className={styles.coloredMark} style={{ backgroundColor: value }} />
        </Popover>
    )
}

export default React.memo(ColoredMark)
