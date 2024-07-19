package chacha.energy.ganghannal

import android.util.Log
import com.google.android.gms.wearable.WearableListenerService
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.DataEvent
import com.google.android.gms.wearable.DataMapItem

class WearableListenerService : WearableListenerService() {
    companion object {
        private const val TAG = "WearableListenerService"
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        Log.d(TAG, "Message received: ${messageEvent.path}")
        // Handle message here
    }

    override fun onDataChanged(dataEvents: DataEventBuffer) {
        dataEvents.forEach { event ->
            if (event.type == DataEvent.TYPE_CHANGED) {
                val dataMap = DataMapItem.fromDataItem(event.dataItem).dataMap
                val timestamp = dataMap.getLong("timestamp")

                val params = Arguments.createMap().apply {
                    putDouble("timestamp", timestamp.toDouble())
                }

                val reactContext = (application as MainApplication).reactNativeHost.reactInstanceManager.currentReactContext
                reactContext?.let {
                    WearModule.sendEventToJS(it, "WearRequest", params)
                }
            }
        }
    }
}