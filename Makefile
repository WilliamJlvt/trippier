.PHONY: run-stack build-apk

# Lance le conteneur Back + Front
run-stack:
	docker build -f docker/runner/Dockerfile -t trippier-stack .
	docker run -p 3000:3000 -p 3001:3001 --name trippier-running --rm trippier-stack

# Construit l'APK
build-apk:
	docker build -f docker/builder-apk/Dockerfile -t trippier-builder .
	docker run --rm -v $(PWD)/mobile:/app/mobile trippier-builder ./gradlew assembleRelease
	@echo "✅ APK generated in mobile/android/app/build/outputs/apk/release/"
