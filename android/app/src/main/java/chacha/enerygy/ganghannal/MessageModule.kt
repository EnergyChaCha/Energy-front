package chacha.enerygy.ganghannal

import android.content.Context
import android.util.Log
import chacha.enerygy.ganghannal.dto.Hello
import com.google.android.gms.tasks.Tasks
import com.google.android.gms.wearable.Wearable
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MessageModule(private val context: Context) {
    val messageClient by lazy { Wearable.getMessageClient(context) }
    private val nodeClient = Wearable.getNodeClient(context)

    fun sendMessage(path: String, message: String){
        val data = Hello(message)
        val gson = Gson()
        val dataJson = gson.toJson(data)
        val sendData = dataJson.toByteArray(Charsets.UTF_8)

        CoroutineScope(Dispatchers.Default).launch {
            try {
                val nodes = Tasks.await(nodeClient.connectedNodes)
                nodes.forEach { node ->
                    val result = Tasks.await(messageClient.sendMessage(node.id, path, sendData))
                    Log.i("메시지 보내기 1", message.toString())
                }
            } catch (e: Exception) {
                Log.i("메시지 보내기 1 에러", e.message.toString())
            }
        }

    }

}