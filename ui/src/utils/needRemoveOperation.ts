import { OperationScope } from '@tesler-ui/core/interfaces/operation'
import { WidgetTypes } from '@tesler-ui/schema'
import { removeRecordOperationWidgets } from '../interfaces/widget'

/**
 * Check whether the operation with `scope` should be removed
 * @param widgetType type of widget
 * @param scope scope of operation
 */
export default function needRemoveOperation({ widgetType, scope }: { widgetType: WidgetTypes | string; scope: OperationScope }) {
    return removeRecordOperationWidgets.includes(widgetType) && scope === 'record'
}
