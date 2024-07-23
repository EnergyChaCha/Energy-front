package chacha.energy.ganghannal

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.google.android.gms.wearable.WearableListenerService
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.DataEvent
import com.google.android.gms.wearable.DataEventBuffer
import com.google.android.gms.wearable.DataMapItem

class WearableListenerService : WearableListenerService() {
    companion object {
        private const val TAG = "메시지"
    }

    fun sayHello(){
        Log.i(TAG, "hello world")
    }

    override fun onCreate() {
        super.onCreate()
        Log.i(TAG, "메시지 서비스 oncreate")
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        Log.d(TAG, "Message received: ${messageEvent.path} ${messageEvent.data}")
        // Handle message here
    }

    override fun onDataChanged(dataEvents: DataEventBuffer) {
        dataEvents.forEach { event ->
            if (event.type == DataEvent.TYPE_CHANGED) {
                val dataMap = DataMapItem.fromDataItem(event.dataItem).dataMap
                val timestamp = dataMap.getLong("timestamp")

                Log.d(TAG, "Message received onDataChanged ${event.toString()}")

                val params = Arguments.createMap().apply {
                    putDouble("timestamp", timestamp.toDouble())
                }

//                val reactContext = (application as MainApplication).reactNativeHost.reactInstanceManager.currentReactContext
//                reactContext?.let {
//                    WearableModule.sendEventToJS(it, "WearRequest", params)
//                }
            }
        }
    }
}