package expo.modules.material3theme

import android.content.res.Resources
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.Dispatchers

class ExpoMaterial3ThemeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("getSystemTheme") {
      return@Function getDynamicColorPalette()
    }

    AsyncFunction("getSystemThemeAsync") {
      return@AsyncFunction getDynamicColorPalette()
    }
  }

  private fun getDynamicColorPalette(): Map<String, Map<String, String>>? {
    Log.d("ExpoMaterial3Theme", "Get dynamic color palette")

    val currentSdk = Build.VERSION.SDK_INT
    val minSdk = Build.VERSION_CODES.S

    // Dynamic colors are only available on Android S and up.
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val resources = this.getApplicationResources()

      if (resources == null) {
        Log.w("ExpoMaterial3Theme", "could not get resources for dynamic color module")
        return null
      }
      return this.getCorePalette(resources)
    } else {
      Log.w("ExpoMaterial3Theme", "SDK version $minSdk is required to run this native module, got $currentSdk")
      null
    }
  }

  private val context
    get() = requireNotNull(appContext.reactContext)

  private fun getApplicationResources(): Resources? {
    if (context.resources == null) {
      Log.d("ExpoMaterial3Theme", "React context resources was null, could not get resource list")
      return null
    }
    return context.resources
  }

  @RequiresApi(Build.VERSION_CODES.S)
  private fun getCorePalette(resources: Resources): Map<String, Map<String, String>> {
    fun colorToHex(key: Int): String {
      val hex = resources.getColor(key, null)
      return String.format("#%06X", 0xFFFFFF and hex)
    }

    val palette = mutableMapOf<String, Map<String, String>>()

    val lightPalette = mutableMapOf<String, String>()
    lightPalette["primary"] = colorToHex(android.R.color.system_accent1_600)
    lightPalette["onPrimary"] = colorToHex(android.R.color.system_accent1_0)
    lightPalette["primaryContainer"] = colorToHex(android.R.color.system_accent1_100)
    lightPalette["onPrimaryContainer"] = colorToHex(android.R.color.system_accent1_900)

    lightPalette["secondary"] = colorToHex(android.R.color.system_accent2_600)
    lightPalette["onSecondary"] = colorToHex(android.R.color.system_accent2_0)
    lightPalette["secondaryContainer"] = colorToHex(android.R.color.system_accent2_100)
    lightPalette["onSecondaryContainer"] = colorToHex(android.R.color.system_accent2_900)

    lightPalette["tertiary"] = colorToHex(android.R.color.system_accent3_600)
    lightPalette["onTertiary"] = colorToHex(android.R.color.system_accent3_0)
    lightPalette["tertiaryContainer"] = colorToHex(android.R.color.system_accent3_100)
    lightPalette["onTertiaryContainer"] = colorToHex(android.R.color.system_accent3_900)

    lightPalette["background"] = colorToHex(android.R.color.system_neutral1_10)
    lightPalette["onBackground"] = colorToHex(android.R.color.system_neutral1_900)

    lightPalette["surface"] = colorToHex(android.R.color.system_neutral1_10)
    lightPalette["onSurface"] = colorToHex(android.R.color.system_neutral1_900)
    lightPalette["surfaceVariant"] = colorToHex(android.R.color.system_neutral2_100)
    lightPalette["onSurfaceVariant"] = colorToHex(android.R.color.system_neutral2_700)

    lightPalette["outline"] = colorToHex(android.R.color.system_neutral2_500)
    lightPalette["outlineVariant"] = colorToHex(android.R.color.system_neutral2_200)

    lightPalette["inverseSurface"] = colorToHex(android.R.color.system_neutral1_800)
    lightPalette["inverseOnSurface"] = colorToHex(android.R.color.system_neutral1_50)
    lightPalette["inversePrimary"] = colorToHex(android.R.color.system_accent1_200)

    val darkPalette = mutableMapOf<String, String>()
    darkPalette["primary"] = colorToHex(android.R.color.system_accent1_200)
    darkPalette["onPrimary"] = colorToHex(android.R.color.system_accent1_800)
    darkPalette["primaryContainer"] = colorToHex(android.R.color.system_accent1_700)
    darkPalette["onPrimaryContainer"] = colorToHex(android.R.color.system_accent1_100)

    darkPalette["secondary"] = colorToHex(android.R.color.system_accent2_200)
    darkPalette["onSecondary"] = colorToHex(android.R.color.system_accent2_800)
    darkPalette["secondaryContainer"] = colorToHex(android.R.color.system_accent2_700)
    darkPalette["onSecondaryContainer"] = colorToHex(android.R.color.system_accent2_100)

    darkPalette["tertiary"] = colorToHex(android.R.color.system_accent3_200)
    darkPalette["onTertiary"] = colorToHex(android.R.color.system_accent3_800)
    darkPalette["tertiaryContainer"] = colorToHex(android.R.color.system_accent3_700)
    darkPalette["onTertiaryContainer"] = colorToHex(android.R.color.system_accent3_100)

    darkPalette["background"] = colorToHex(android.R.color.system_neutral1_900)
    darkPalette["onBackground"] = colorToHex(android.R.color.system_neutral1_100)

    darkPalette["surface"] = colorToHex(android.R.color.system_neutral1_900)
    darkPalette["onSurface"] = colorToHex(android.R.color.system_neutral1_100)
    darkPalette["surfaceVariant"] = colorToHex(android.R.color.system_neutral2_700)
    darkPalette["onSurfaceVariant"] = colorToHex(android.R.color.system_neutral2_200)

    darkPalette["outline"] = colorToHex(android.R.color.system_neutral2_400)
    darkPalette["outlineVariant"] = colorToHex(android.R.color.system_neutral2_700)

    darkPalette["inverseSurface"] = colorToHex(android.R.color.system_neutral1_100)
    darkPalette["inverseOnSurface"] = colorToHex(android.R.color.system_neutral1_800)
    darkPalette["inversePrimary"] = colorToHex(android.R.color.system_accent1_600)

    palette["dark"] = darkPalette
    palette["light"] = lightPalette

    return palette
  }
}
