package expo.modules.material3theme

import android.content.res.Resources
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoMaterial3ThemeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("getSystemTheme") {
      return@Function getDynamicColorPalette()
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

  private fun getDynamicColorPalette(): Map<String, Map<String, String>>? {
    Log.d("ExpoMaterial3Theme", "Get dynamic color palette")

    val currentSdk = Build.VERSION.SDK_INT
    val minSdk = Build.VERSION_CODES.S

    // Dynamic colors are only available on Android S and up.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val resources = this.getApplicationResources()

      if (resources == null) {
        Log.w("ExpoMaterial3Theme", "could not get resources for dynamic color module")
        return null
      }

      return this.getCorePalette(resources)
    } else {
      Log.w("ExpoMaterial3Theme", "SDK version $minSdk is required to run this native module, got $currentSdk")
      return null
    }
  }

  @RequiresApi(Build.VERSION_CODES.S)
  private fun getCorePalette(resources: Resources): Map<String, Map<String, String>> {
    fun getColor(key: Int): String {
      val hex = resources.getColor(key, null)
      return String.format("#%06X", 0xFFFFFF and hex)
    }

    val palette = mutableMapOf<String, Map<String, String>>()

    val lightPalette = mutableMapOf<String, String>()
    lightPalette["primary"] = getColor(android.R.color.system_accent1_600)
    lightPalette["onPrimary"] = getColor(android.R.color.system_accent1_0)
    lightPalette["primaryContainer"] = getColor(android.R.color.system_accent1_100)
    lightPalette["onPrimaryContainer"] = getColor(android.R.color.system_accent1_900)

    lightPalette["secondary"] = getColor(android.R.color.system_accent2_600)
    lightPalette["onSecondary"] = getColor(android.R.color.system_accent2_0)
    lightPalette["secondaryContainer"] = getColor(android.R.color.system_accent2_100)
    lightPalette["onSecondaryContainer"] = getColor(android.R.color.system_accent2_900)

    lightPalette["tertiary"] = getColor(android.R.color.system_accent3_600)
    lightPalette["onTertiary"] = getColor(android.R.color.system_accent3_0)
    lightPalette["tertiaryContainer"] = getColor(android.R.color.system_accent3_100)
    lightPalette["onTertiaryContainer"] = getColor(android.R.color.system_accent3_900)

    lightPalette["background"] = getColor(android.R.color.system_neutral1_10)
    lightPalette["onBackground"] = getColor(android.R.color.system_neutral1_900)

    lightPalette["surface"] = getColor(android.R.color.system_neutral1_10)
    lightPalette["onSurface"] = getColor(android.R.color.system_neutral1_900)
    lightPalette["surfaceVariant"] = getColor(android.R.color.system_neutral2_100)
    lightPalette["onSurfaceVariant"] = getColor(android.R.color.system_neutral2_700)

    lightPalette["outline"] = getColor(android.R.color.system_neutral2_500)
    lightPalette["outlineVariant"] = getColor(android.R.color.system_neutral2_200)

    lightPalette["inverseSurface"] = getColor(android.R.color.system_neutral1_800)
    lightPalette["inverseOnSurface"] = getColor(android.R.color.system_neutral1_50)
    lightPalette["inversePrimary"] = getColor(android.R.color.system_accent1_200)

    val darkPalette = mutableMapOf<String, String>()
    darkPalette["primary"] = getColor(android.R.color.system_accent1_200)
    darkPalette["onPrimary"] = getColor(android.R.color.system_accent1_800)
    darkPalette["primaryContainer"] = getColor(android.R.color.system_accent1_700)
    darkPalette["onPrimaryContainer"] = getColor(android.R.color.system_accent1_100)

    darkPalette["secondary"] = getColor(android.R.color.system_accent2_200)
    darkPalette["onSecondary"] = getColor(android.R.color.system_accent2_800)
    darkPalette["secondaryContainer"] = getColor(android.R.color.system_accent2_700)
    darkPalette["onSecondaryContainer"] = getColor(android.R.color.system_accent2_100)

    darkPalette["tertiary"] = getColor(android.R.color.system_accent3_200)
    darkPalette["onTertiary"] = getColor(android.R.color.system_accent3_800)
    darkPalette["tertiaryContainer"] = getColor(android.R.color.system_accent3_700)
    darkPalette["onTertiaryContainer"] = getColor(android.R.color.system_accent3_100)

    darkPalette["background"] = getColor(android.R.color.system_neutral1_900)
    darkPalette["onBackground"] = getColor(android.R.color.system_neutral1_100)

    darkPalette["surface"] = getColor(android.R.color.system_neutral1_900)
    darkPalette["onSurface"] = getColor(android.R.color.system_neutral1_100)
    darkPalette["surfaceVariant"] = getColor(android.R.color.system_neutral2_700)
    darkPalette["onSurfaceVariant"] = getColor(android.R.color.system_neutral2_200)

    darkPalette["outline"] = getColor(android.R.color.system_neutral2_400)
    darkPalette["outlineVariant"] = getColor(android.R.color.system_neutral2_700)

    darkPalette["inverseSurface"] = getColor(android.R.color.system_neutral1_100)
    darkPalette["inverseOnSurface"] = getColor(android.R.color.system_neutral1_800)
    darkPalette["inversePrimary"] = getColor(android.R.color.system_accent1_600)

    palette["dark"] = darkPalette
    palette["light"] = lightPalette

    return palette
  }
}
