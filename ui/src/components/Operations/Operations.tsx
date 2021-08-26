import React from 'react'
import { $do, useWidgetOperations } from '@tesler-ui/core'
import { Operation, OperationGroup } from '@tesler-ui/core/interfaces/operation'
import { WidgetMeta } from '@tesler-ui/core/interfaces/widget'
import { Button, Icon } from 'antd'
import { AppState } from '../../interfaces/storeSlices'
import styles from './Operations.module.css'
import OperationButton from '../ui/OperationButton/OperationButton'
import { useDispatch, useSelector } from 'react-redux'
import OperationsGroup from './components/OperationsGroup'
import needRemoveOperation from '../../utils/needRemoveOperation'

export interface OperationsOwnProps {
    bcName: string
    widgetMeta: WidgetMeta
    operations: Array<Operation | OperationGroup>
    hiddenGroups?: string[]
}

export function Operations(props: OperationsOwnProps) {
    const { bcName, widgetMeta, operations, hiddenGroups } = props
    const metaInProgress = useSelector((store: AppState) => store.view.metaInProgress[bcName])
    const dispatch = useDispatch()
    const currentOperations = useWidgetOperations(operations, widgetMeta).filter(item => item.type !== 'file-upload-save')
    const createClickHandler = React.useCallback(
        (operation: Operation) => () => {
            dispatch(
                $do.sendOperation({
                    bcName,
                    operationType: operation.type,
                    widgetName: widgetMeta.name,
                    bcKey: operation.bcKey,
                    confirmOperation: operation.preInvoke
                })
            )
        },
        [dispatch, bcName, widgetMeta]
    )
    return (
        <div className={styles.container}>
            {metaInProgress ? (
                <Button loading type="link" className={styles.loading} />
            ) : (
                currentOperations.map((item: Operation | OperationGroup) => {
                    if ((item as OperationGroup).actions) {
                        const group = item as OperationGroup
                        return (
                            <OperationsGroup
                                key={group.type}
                                group={group}
                                hiddenGroups={hiddenGroups}
                                widgetType={widgetMeta.type}
                                onClickCreator={createClickHandler}
                            />
                        )
                    }

                    const ungroupedOperation = item as Operation
                    return needRemoveOperation({ widgetType: widgetMeta.type, scope: ungroupedOperation.scope }) ? null : (
                        <OperationButton key={ungroupedOperation.type} onClick={createClickHandler(ungroupedOperation)}>
                            {ungroupedOperation.icon && <Icon type={ungroupedOperation.icon} />}
                            {item.text}
                        </OperationButton>
                    )
                })
            )}
        </div>
    )
}

export default React.memo(Operations)
