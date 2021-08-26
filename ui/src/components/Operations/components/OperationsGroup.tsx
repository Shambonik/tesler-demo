import React from 'react'
import { Operation, OperationGroup } from '@tesler-ui/core/interfaces/operation'
import { Dropdown, Icon, Menu } from 'antd'
import OperationButton from '../../ui/OperationButton/OperationButton'
import styles from './OperationsGroup.module.css'
import { ButtonType } from 'antd/lib/button/button'
import { WidgetTypes } from '@tesler-ui/schema'
import needRemoveOperation from '../../../utils/needRemoveOperation'

interface OperationsGroupProps {
    group: OperationGroup
    onClickCreator: (operation: Operation) => () => void
    widgetType: WidgetTypes | string
    hiddenGroups?: string[]
    buttonType?: ButtonType
}

function OperationsGroup({ group, widgetType, onClickCreator, hiddenGroups, buttonType }: OperationsGroupProps) {
    if (group.type && hiddenGroups?.includes(group.type)) {
        return null
    }
    let groupIsEmpty = true
    const moreOperations = (
        <div className={styles.overlayContainer}>
            <Menu>
                {group.actions.map(operation => {
                    if (needRemoveOperation({ widgetType: widgetType, scope: operation.scope })) {
                        return null
                    }

                    groupIsEmpty = false
                    return (
                        <Menu.Item key={operation.type} className={styles.subOperation} onClick={onClickCreator(operation)}>
                            {operation.icon && <Icon type={operation.icon} />}
                            {operation.text}
                        </Menu.Item>
                    )
                })}
            </Menu>
        </div>
    )

    if (groupIsEmpty) {
        return null
    }

    return (
        <Dropdown trigger={['click']} overlay={moreOperations} getPopupContainer={element => element.parentElement as HTMLElement}>
            <OperationButton key={group.text} type={buttonType}>
                <Icon type={group.icon} />
                {group.text}
            </OperationButton>
        </Dropdown>
    )
}

export default React.memo(OperationsGroup)
